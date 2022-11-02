---
title: 'How to Create List of Related Content in Gatsby.JS'
date: "2021-04-10"
toc: true
slug: related-posts-gatsbyjs
tags:
  - Gatsby
  - Web
---

I really dig the idea of [digital garden](https://joelhooks.com/digital-garden) - content in your
site should be linked by content type not in a typical chronological order. One simple step towards
such an organization of content is to have a list of related posts at the end of every post. If you
look at the end of this post you can find a live example of what I am talking about.

<!-- excerpt -->

In this post, I am going to describe how I implemented _Related Posts_ feature in my site which is
powered by [gatsby.js](https://www.gatsbyjs.com/).

{% warning %}
NOTE: This site now uses 11ty instead of gatsby.js. You can find all the code at the old
repository at [github](https://github.com).
{% endwarning %}

## The Logic

There could be multiple ways to measure similarity between different posts. One common logic I have
seen people using across the web is to find posts with matching tags. I think it is a good
first order criteria, but we could do a lot more than that. The next idea that comes to me is to
use string matching similarity between titles of different posts. Additionally, they can be
sorted by time difference with the current post. Out of all matching posts, the ones that have been
posted closest to the current post - in the past as well as in the future - get higher priority.

In summary, following is the logic used in this website:

+ Look at all posts other than the current post - identified by having a different _slug_.
+ Calculate number of matching tags.
+ Calculate string similarity between titles of the current post and all other posts
  using [Sørensen–Dice coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient),
  which is a number between 0 and 1.
+ Final similarity between two posts is: # of matching tags + 3.0 * title string similarity
+ Sort other posts using similarity (in descending order) as primary key and absolute time
  difference between the current post and the other post (in ascending order) as secondary key.
+ Pick top-K other posts to display as related content.


## Implementation

If you think about the above logic, the biggest issue is  that this is an $\mathcal{O}(n^2 \log {} n)$ algorithm:
calculate similarities between every post vs all other posts ($\mathcal{O}(n^2)$) and then sort each
of the lists of similarities ($\mathcal{O}(n^2 \log {} n)$). So If you have a site with 100 posts,
it needs to calculate 100 similarities, and then sort each of the 100 size array using
$100 \times \log{} 100 \approx 330$ calculations, for each of the 100 posts, thus, requiring a total
of $100 \times 430 \approx 430, 000$ calculations! Clearly this is something you would not want to
do at runtime using javascript.

Luckily in gatsby.js, you can have these calculations performed at the build time. Gtasby provides a
[schema customization API](https://www.gatsbyjs.org/docs/schema-customization) - that can be used
to explicitly add custom functionality to the query layer. In this particular case, we are going to
add a section called **relatedReads** to query layer.

 ```graphql
{
  id
  body
  fields {
    slug
  }
  ...
  relatedReads(limit: 4) {
    excerpt(pruneLength: 72)
    frontmatter {
      ...
    }
  }
}
```

Additionally, we can use this to implement the logic of Relative Reads. All this code can be put in
the `gatsby-node.js` file:

```js
exports.createResolvers = ({ createResolvers }) =>
  createResolvers({
    Mdx: {
      relatedReads: {
        type: '[Mdx!]',
        args: { limit: 'Int' },
        async resolve(source, args, ctx, info) {
          let limit = args.limit;
          let otherPosts = await ctx.nodeModel.runQuery({
            firstOnly: false,
            type: `Mdx`,
            query: {
              filter: {
                fileAbsolutePath: { regex: 'content/blog/' }, // only posts
                fields: { slug: { ne: source.fields.slug } }, // not current article
                frontmatter: {
                  published: { eq: true }, // published only posts
                },
              },
            },
          })

          return otherPosts
            .map((p) => ({
              ...p,
              similarity: intersection(p.frontmatter.tags, source.frontmatter.tags).length + 3.0 * stringSimilarity.compareTwoStrings(p.frontmatter.title, source.frontmatter.title),
            }))
            .filter(({ similarity }) => similarity !== 0)
            .sort((a, b) => {
              const interval_a = Math.abs(new Date(a.frontmatter.date) - new Date(source.frontmatter.date));
              const interval_b = Math.abs(new Date(b.frontmatter.date) - new Date(source.frontmatter.date));

              return b.similarity - a.similarity || interval_a - interval_b;
            })
            .slice(0, limit)
        },
      },
    },
  })
```

In the first half we filter the other posts that could be related to the current post. This is done
via the filter rules in the query above. Finally in the return statement, similarity is calculated
based on the logic above. In particular, to calculate the dice coefficient between titles of
different posts, I have a library called [string-similarity](https://www.npmjs.com/package/string-similarity).
`stringSimilarity.compareTwoStrings(s1, s2)` gives a similarity measure between 0 and 1 for the two
strings s1 and s2.

Once we have inserted **relatedReads** to all posts queries, we can easily access these in the post
layout and use these to build a related posts component.

In particular, in `postLayout.js`, we can query these and then add a related posts component as follows:

```js
<RelatedPosts posts={mdx.relatedReads} tags={mdx.frontmatter.tags} />
```

In my particular case, I have defined by a RelatedPosts component using the data accessed
from query in the `postLayout.js` file.

If you are curious have a loot at the [github repo](https://github.com/sadanand-singh/reckoning.dev-gatsby)
of this website for any additional details.

## Future Work

The logic defined above is still quite basic. We live in a world where we have made significant
progress in the field of natural language processing via models like
[BERT](https://arxiv.org/abs/1810.04805), [GPT-3](https://openai.com/blog/gpt-3-apps/) etc. We can
use these much more advanced models to go through the complete body of posts and get a better
similarity scores. We have advanced javascript libraries like [tf.js](https://www.tensorflow.org/js)
that can make implementation of these complex models very simple. In a future version of this site,
I plan to implement some of these models.
