async function pagination(page, per_page, models) {
  const { Post, User }  = models 
  console.log('Зашел в пагинацию')
  if (!page && per_page && Post && User) {
    console.error;
  }
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: User
        },
      ],
    });
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

    const posts = await (sortPosts.slice(startIndex, endIndex)).map((e) => {
      e.User = `${e.User.nickname}`;
      e = {...e, authors_nickname: `${e.User}` };
      return e
    });
   
    // posts[0].User = `${posts[0].User.nickname}`;
    // posts[0] = { ...posts[0], authors_nickname: `${posts[0].User}` };
    // console.log('Все посты', posts);

    return {posts, countPosts, countPages, lastPage}

    // {{[Posts]}, {countPosts, countPages, lastPage}}
  } catch (error) {
    console.log(error);
  }
}

module.exports =  pagination;
