const getProperty = (property) => (property ? property : '');

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const getHtml = (data = {}) => `<div class="w-full lg:max-w-full lg:flex">
<div class="h-36 flex flex-col justify-between leading-normal divide-y divide-slate-200 dark:divide-gray-700">
  <div class="mb-8">
  <a href="${getProperty(data.url)}" target="_blank" rel="noopener noreferrer" >
    <p class="text-sm text-gray-600 flex items-center">
      <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
      </svg>
      ${getProperty(data.domain)}
    </p>
    <div class="text-gray-800 dark:text-gray-300 font-bold text-xl mb-2">${getProperty(data.title)}</div>
    <p class="text-gray-600 dark:text-gray-400 text-base">${getProperty(truncateString(data.description, 180))}</p>
    </a>
  </div>
</div>
</div>`;

module.exports = getHtml;
