---
title: 'Why I Moved My Personal Website back to Gatsby.JS'
date: "2021-04-09"
toc: true
slug: back-to-gatsbyjs-2021
tags:
  - Gatsby
  - Web
---

In the last few years I have experimented quite a bit with py person website. I started this blog
using [pelican](https://blog.getpelican.com/) in 2014. Since then, I moved to
[Nikola](https://getnikola.com/), and then to [Hugo](https://gohugo.io/). Then in
[April 2019](/blog/hugo-to-gatsby/), I moved this site to [gatsby.js](https://www.gatsbyjs.com/).
Then in last 2 years, I played quite a bit with gatsby[^1] [^2] [^3] [^4] - different starters and
themes, but moved to [11ty](https://www.11ty.dev/), moved back to Hugo, back to 11ty...

<!-- excerpt -->

You can see the pattern. You might say I am a Static Site Generator (SSG) hopper! The main reason
for these moves have been my constant quest for learning something new and making this platform
simple and aesthetically pleasing.


{% tldr %}
**TLDR;**

[Gatsby](https://www.gatsbyjs.com/) is an open source static site generator and brings reactive
capabilities (based on React js) for building interactive views. My personal website now has
all parts built using React Components. Some common highlights are Plotly interaction plots,
News, Publications in [about me](/about) page etc.
{% endtldr %}

But, I am now fully convinced 😁 to stick with gatsby. Keep reading if you want to know what made
me solidify my views!

## Why Move Back?

I am a researcher by training. My most of the day to day work primarily involves writing code in
Python and C++. When I had first moved to gatsby from Hugo, I was really new to the world of
javascript, react, and even CSS. I felt the learning curve was very steep and I was feeling very
lost. That made me move to simpler frameworks like 11ty and Hugo.

While hopping for different SSGs, I learnt quite a lot about front-end development. Some of the
things, that I have learnt well in this process has been:

- [TailwindCSS](https://tailwindcss.com/)
- [Styled Components](https://styled-components.com/)
- [Javascript](https://www.javascript.com/)
- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/)

Now that I am comfortable with these frameworks using these became fun. Another small complain
I have had about gatsby.js - its very slow build time. Then I came across this netlify plugin -
[netlify-plugin-gatsby-cache](https://github.com/jlengstorf/netlify-plugin-gatsby-cache) -
speeding up the whole process significantly. And, as expected, this site is blazing fast!

{% fig "https://res.cloudinary.com/sadanandsingh/image/upload/v1617993565/Screen_Shot_2021-04-06_at_6.15.56_PM_uu0k3x.png" %}

Apart from my own learning, my main reasons for the move can summarized as below:

### Interactive and Data-driven Views

Overall my notion of a blog is, it should be interactive and dynamic. Completely static text based
sites are things of past. Specially since most my posts are about AI research, data science etc.,
having interactive components like plots, tables etc. makes it really easy to describe any results,
concepts etc. Using react, [mdx](https://mdxjs.com/) and a plethora of
[plugins](https://www.gatsbyjs.com/plugins), gatsby.js makes it really easy and fun to write.

### Improved Workflow

Being able to define a data model and render/update views by changing the underlying data model
provides an really great workflow. See [my list of publications](/about/#publications) or
[recent news updates](/news) as examples where view is updated based on the data.
So now, if I have to update any of these, I just update the data file and these page get
automatically updated! For regular posts, I write my posts as mdx files and push it to github,
netlify takes care of the rest for publishing my site.

### Dynamic Data from APIs

One thing that I really missed in other SSGs was to be able to get data dynamically from various
source and display them in your posts. I know this sounds like - why do you need this in a static
website? However, based on my own reading habits, any post is really convicing you can have visuals
built with data from multiple sources. To be able to get the data on the fly and have it updated
without rebuilding your site makes your posts a lot more powerful.

Here is a live working example. I have been an avid user of
[Code::Stats](https://codestats.net/users/sadanand-singh) to track my coding habits. Their online
page provides a good summary of my data, but I was also interested in additional visualizations like

- How am I doing on different days of the Week?
- What fraction of my time is spent on different languages that I work with?


React allows me to code these right in mdx files and visualize them without rebuilding this site
again and again. You can take a look at my React component that enables rendering the above plots here
at [Github](https://github.com/sadanand-singh/reckoning.dev-gatsby/blob/main/src/components/codeStats.js).


## (Re)Active/Interactive Components

You just saw above, now I can add dynamic plots in the middle of this post from the markdown/mdx
file. Similarly, we can add any type of react components in markdown and build really powerful
sites! You can take a look all of my components at this site's
[Github Repo](https://github.com/sadanand-singh/reckoning.dev-gatsby/blob/main/src/components/).

Any of these components can be easily added to any mdx file as follows:

```js
import { CodeStats } from " ../components/codeStats.js";
<CodeStats />;
```

## How did I do it?

### gatsby.js

Given I had already used gatsby before, it was pretty easy tyo work with it. Nevertheless, since I
understand a lot more about many of the underlying technologies and frameworks, it was a lot of fun
rewriting different parts.

I was able to get a skeleton going over a long weekend.

+ Use code from my old gatsby repo to get most basic features ready pretty quickly.
+ Hunt for a teamplate to start with! Gatsby offers a gallery of templates spanning websites for a
  ton of use cases such as education, design portfolio, blogs etc.
  [Jeff Jadulco's template](https://github.com/jeffjadulco/jeffjadulco.com) worked great for me.
  This template is a personal website template that uses tailwindcss.
+ Modifying Template - build custom layouts as needed. I mainly focused on building pages for about
  me page and an underlying json data model to support them.

### netlify

Setting up netlify was pretty straightforward. Given custom domain name was already setup, all
I had to do was update the github repo and update the netlify.toml file.
See the [Github Repo](https://github.com/sadanand-singh/reckoning.dev-gatsby) of this site
for more details on this.

And thats all! I will be writing more details about development of different components and
features in this site in a series of posts.


## Older Posts

[^1]: [This Blog is Now Powered by GatsbyJS](/blog/hugo-to-gatsby/)
[^2]: [Updating GatsbyJS Looks: A New Home with A New Look](/blog/gatsby-theme-new/)
[^3]: [New Features for this Blog](/blog/blog-new-features/)
[^4]: [Using Novela Theme with Modifications](/blog/novela-theme-update/)
