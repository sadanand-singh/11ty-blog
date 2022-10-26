const markdownLib = require('../plugins/markdown');

module.exports = {
	/**
	 * ===== Wrapper =====
	 *
	 * You can't add DIVs to native Markdown. Using this wrapper you can
	 * wrap any content, or other shortcodes, in a block you can style however you want.
	 * It also inserts a "wrapper" class you can style for externally in /src/assets/css/tailwind.css
	 * And a padding of 1rem (16px) which you may or may not want to delete depending on your design updates.
	 *
	 * Usage in .md files:
	 *  {% wrap "tailwind classes here" $} Content goes here {% endwrap %}
	 */
	wrap: function (content, classes = '') {
		return `<div class="wrapper ${classes}">${content}</div>`
	},

	/**
	 * ===== Blockquote =====
	 *
	 * Usage in .md files:
	 *  {% bq "tailwind classes here" %} Content goes here {% endbq %}
	 */
	bq: function (content, classes = '') {
		return `<blockquote class="${classes}">${content}</blockquote>`
	},

	info: function (children, classes = '') {
		const content = markdownLib.render(children);
		return `<aside class="relative mt-2 bg-slate-200  dark:bg-slate-900 border-l-2 pl-5 pr-3 py-2 pb-2 rounded-r text-gray-600 dark:text-gray-400 border-indigo-700 dark:border-indigo-300 ${classes}"><span class="-ml-10 mt-5 absolute text-indigo-700 dark:text-indigo-300"><div class="rounded-full h-10 w-10 pl-2 bg-slate-200 dark:bg-slate-900 border-indigo-700 dark:border-indigo-300 border-2 items-center" style="padding-top: 3px;"><span><svg aria-hidden="true" class="mr-1 inline h-5 w-5  transition duration-100 text-null-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.734c0 4.164-3.75 6.98-3.75 10.266h-1.992c.001-2.079.996-3.826 1.968-5.513.913-1.585 1.774-3.083 1.774-4.753 0-3.108-2.518-4.734-5.004-4.734-2.482 0-4.996 1.626-4.996 4.734 0 1.67.861 3.168 1.774 4.753.972 1.687 1.966 3.434 1.967 5.513h-1.991c0-3.286-3.75-6.103-3.75-10.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-4 11.766c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm0 2c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm-1.701 3.159c-.19.216-.465.341-.752.341h-1.094c-.287 0-.562-.125-.752-.341l-1.451-1.659h5.5l-1.451 1.659zm-.931-14.659h-.689v-1h.689v1zm.913 0h-.428v-1h.807l-.379 1zm-2.531 0l-.396-1h.834v1h-.438zm4.25-.995c-1.622 3.654-2.38 5.049-2.38 8.995h-1.241c0-3.946-.757-5.341-2.379-8.995h.776c1.172 2.851 1.988 3.997 2.224 7.021.234-3.024 1.052-4.17 2.223-7.021h.777z"></path></svg></span></div></span><div className="ml-2">${content}</div></aside>`
	},

	warning: function (children, classes = '') {
		const content = markdownLib.render(children);
		return `<aside class="relative mt-4 bg-slate-200  dark:bg-slate-900 border-l-2 pl-5 pr-3 py-2 pb-2 rounded-r text-gray-600 dark:text-gray-400 border-orange-700 dark:border-orange-300 prose-headings:text-orange-700 ${classes}"><span class="-ml-10 mt-5 absolute text-orange-700 dark:text-orange-300"><div class="rounded-full h-10 w-10 pl-2 bg-slate-200 dark:bg-slate-900 border-orange-700 dark:border-orange-300 border-2 items-center" style="padding-top: 1px;"><span><svg aria-hidden="true" class="mr-1 inline h-5 w-5  transition duration-100 text-null-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"></path></svg></span></div></span><div className="ml-2">${content}</div></aside>`
	},

	quote: function (children, classes = '') {
		const content = markdownLib.render(children);
		return `<aside class="relative mt-2 bg-slate-200  dark:bg-slate-900 border-l-2 pl-5 pr-3 py-2 pb-2 rounded-r text-gray-600 dark:text-gray-400 border-teal-700 dark:border-teal-300 ${classes}"><span class="-ml-10 mt-5 absolute text-teal-700 dark:text-teal-300"><div class="rounded-full h-10 w-10 pl-2 bg-slate-200 dark:bg-slate-900 border-teal-700 dark:border-teal-300 border-2 items-center" style="padding-top: 3px;"><span><svg aria-hidden="true" className="mr-1 inline transition duration-100 text-null-500 h-5 w-5 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="M11 9.275c0 5.141-3.892 10.519-10 11.725l-.984-2.126c2.215-.835 4.163-3.742 4.38-5.746-2.491-.392-4.396-2.547-4.396-5.149 0-3.182 2.584-4.979 5.199-4.979 3.015 0 5.801 2.305 5.801 6.275zm13 0c0 5.141-3.892 10.519-10 11.725l-.984-2.126c2.215-.835 4.163-3.742 4.38-5.746-2.491-.392-4.396-2.547-4.396-5.149 0-3.182 2.584-4.979 5.199-4.979 3.015 0 5.801 2.305 5.801 6.275z"></path></svg></span></div></span><div className="ml-2">${content}</div></aside>`
	},

	tldr: function (children, classes = '') {
		const content = markdownLib.render(children);
		return `<aside class="relative mt-2 bg-slate-200  dark:bg-slate-900 border-l-2 pl-5 pr-3 py-2 pb-2 rounded-r text-gray-600 dark:text-gray-400 border-blue-700 dark:border-blue-300 ${classes}"><span class="-ml-10 mt-5 absolute text-blue-700 dark:text-blue-300"><div class="rounded-full h-10 w-10 pl-2 bg-slate-200 dark:bg-slate-900 border-blue-700 dark:border-blue-300 border-2 items-center" style="padding-top: 3px;"><span class="mt-2"><svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="24" width="24" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
		<g transform="translate(0 -1028.4)">
		 <path d="m3 8v2 1 3 1 5 1c0 1.105 0.8954 2 2 2h14c1.105 0 2-0.895 2-2v-1-5-4-3h-18z" transform="translate(0 1028.4)" fill="currentColor"/>
		 <path d="m3 1035.4v2 1 3 1 5 1c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-1-5-4-3h-18z" fill="#ecf0f1"/>
		 <path d="m3 1034.4v2 1 3 1 5 1c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-1-5-4-3h-18z" fill="#bdc3c7"/>
		 <path d="m3 1033.4v2 1 3 1 5 1c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-1-5-4-3h-18z" fill="#ecf0f1"/>
		 <path d="m5 1c-1.1046 0-2 0.8954-2 2v1 4 2 1 3 1 5 1c0 1.105 0.8954 2 2 2h2v-1h-1.5c-0.8284 0-1.5-0.672-1.5-1.5s0.6716-1.5 1.5-1.5h12.5 1c1.105 0 2-0.895 2-2v-1-5-4-3-1c0-1.1046-0.895-2-2-2h-4-10z" transform="translate(0 1028.4)" fill="currentColor"/>
		 <path d="m8 1v18h1 9 1c1.105 0 2-0.895 2-2v-1-5-4-3-1c0-1.1046-0.895-2-2-2h-4-6-1z" transform="translate(0 1028.4)" fill="currentColor"/>
		</g>
	   </svg></span></div></span><div className="ml-2">${content}</div></aside>`
	},

	/**
	 * ===== Column Wrapper & Cols - REQUIRED =====
	 *
	 * Using this column wrapper and 'cols' below
	 * you can create columnar content in your .md files.
	 *
	 * Usage in .md files:
	 *  {% columns "optional additional tailwind classes" %}
	 *    {% cols "optional add'l tailwind classes" %} Content for left column {% endcols %}
	 *    {% cols "optional add'l tailwind classes" %} Content for right column {% endcols %}
	 *  {% endcolumns %}
	 */
	columns: function (content, classes = '') {
		return `<div class="flex flex-col md:flex-row ${classes}">${content}</div>`
	},

	/** See usage example above.
	 * You can add as many 'cols' as you want columns
	 */
	cols: function (content, classes = '') {
		return `<div class="flex-1 p-1 m-1 ${classes}">${content}</div>`
	},

	/** ===== Description List Wrapper, Term, and Description
	 *
	 * Native Markdown doesn't support Description Lists
	 * which you may want to use for FAQs or other listed content for which
	 * regular UL and OL lists are not appropriate.
	 *
	 * Much like Columns above, you'll need to use the 'dl' wrapper around
	 * a series of 'dt' and 'dd' shortcodes.
	 *
	 * Also you may want to adjust the TailwindCSS colors and paddings attached
	 * to the 'dt' and 'dd' shortcodes for your specific display requirements.
	 *
	 * Example post: /2020/09/04/description-list-shortcodes/
	 *
	 * Usage in .md files
	 *  {% dl %}
	 *    {% dt %} Question one. {% enddt %}
	 *    {% dd %} The answer for question one. {% enddd %}
	 *
	 *    {% dt %} Question two. {% enddt %}
	 *    {% dd %} The answer for question two. {% enddd %}
	 *
	 *    {% dt %} Question three. {% enddt %}
	 *    {% dd %} The answer for question three. {% enddd %}
	 *  {% enddl %}
	 */
	dl: function (content, classes = '') {
		return `<dl class="${classes}">${content}</dl>`
	},

	/** Description List: Term/Question
	 *    See example usage above
	 */
	dt: function (content, classes = '') {
		return `<div class="border-t border-gray-300 mt-4 pt-4 md:grid md:grid-cols-12 md:gap-8"><dt class="font-semibold md:col-span-5 ${classes}">${content}</dt>`
	},

	/** Description List: Description/Answer
	 *    See example usage above
	 */
	dd: function (content, classes = '') {
		return `<dd class="pb-4 md:col-span-7 md:mt-0  ${classes}">${content}</dd></div>`
	},
}
