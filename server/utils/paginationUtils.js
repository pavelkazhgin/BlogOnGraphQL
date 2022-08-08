async function pagination(page, per_page, model) {
  console.log('Зашел в пагинацию')
  if (!page && per_page && model) {
    console.error;
  }
  try {
    const allPosts = await model.findAll();
    const arrPosts = JSON.parse(JSON.stringify(allPosts))
    // console.log('Все посты', arrPosts);
    const countPosts = arrPosts.length;
    
    // console.log('Длина массива всех постов', countPosts);
    const countPages = Math.ceil(countPosts / per_page);
    // console.log('Все страницы', countPages);
    const lastPage = page === countPages;
    // console.log('Последняя страница', lastPage);

    const sortPosts = await arrPosts.sort(function(a, b)  {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt)
    })
    // console.log('Отсортированный массив', sortPosts);
    let startIndex 

    if (page === 1){
       startIndex = page * per_page;
    }
     startIndex = (page - 1) * per_page; // 2-1 * 4 - > получаем первую запись из массива
    
    const endIndex = page * per_page; // 2 * 4 = 8 и последнюю

    const posts = sortPosts.slice(startIndex, endIndex);


    return [{posts}, {countPosts, countPages, lastPage}];

    // {{[Posts]}, {countPosts, countPages, lastPage}}
  } catch (error) {
    console.log(error);
  }
}

module.exports =  pagination;
