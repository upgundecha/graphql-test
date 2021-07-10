const Authors = [
    {
      id: 1,
      name: "Unmesh Gundecha",
      books: [
        {
          id: 1,
          title: "Selenium Testing Tools Cookbook - Second Edition 2nd Edition",
          published: true,
          year: 2015,
          link: "https://www.amazon.com/gp/product/B017HP96S2",
          rating: 4.6,
          author: 1
        },
        {
          id: 2,
          title: "Selenium WebDriver 3 Practical Guide: End-to-end automation testing for web and mobile browsers with Selenium WebDriver, 2nd Edition",
          published: true,
          year: 2018,
          link: "https://www.amazon.com/gp/product/B07BJKWB1J",
          rating: 4,
          author: 1
        }
      ]
    },
    {
      id: 2,
      name: "Dima Kovalenko",
      books: [
        {
          id: 3,
          title: "Selenium Design Patterns and Best Practices",
          published: true,
          year: 2014,
          link: "https://www.amazon.com/Selenium-Design-Patterns-Best-Practices-ebook/dp/B00NVDAWXI/",
          rating: 3.9,
          author: 2
        }
      ]
    },
    {
      id: 3,
      name: "James Bond",
      books: []
    }
  ];
  
  module.exports = {
    Authors
  };