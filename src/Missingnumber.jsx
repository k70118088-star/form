import React from 'react'

const Missingnumber = () => {

     let missingValue = [1, 2, 3, 5, 7, 8, 9, 10];

let missing = [];

for (let i = 1; i <= 10; i++) {
  if (!missingValue.includes(i)) {
    missing.push(i);
  }
}

console.log("Missing numbers:", missing);
  return (
    <div>

    </div>
  )
}

export default Missingnumber