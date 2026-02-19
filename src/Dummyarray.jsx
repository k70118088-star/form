import React, { useEffect } from "react";

const Dummyarray = () => {
  const dummyArray = [
    {
      name: "radialCode",
      dummarray: [
        {
          value: 1,
          category: [
            {
              name: "frontend",
              description: "lorem",
              values: [1, 2, 3, 4, 5, 5],
              image: "https://iso.500px.com/wp-content/uploads/2016/02/stock-photo-114337435-1500x1000.jpg",
            },
            {
              name: "backend",
              description: "lorem",
              values: [1, 2, 3, 4, 5, 5],
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyE46sZIzH-NVLLVllUYdTYNzSxiOdd8ByMQ&s",
            },
            {
              name: "Mobile App",
              description: "lorem",
              values: [1, 2, 3, 4, 5, 5],
              image: "https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw=",
            },
          ],
        },
      ],
    },
  ];

   
    console.log("Name:", dummyArray[0].name);   
    console.log(dummyArray[0].dummarray[0].category);


  return <div>Check Console</div>;
};

export default Dummyarray;
