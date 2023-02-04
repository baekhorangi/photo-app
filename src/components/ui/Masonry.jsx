import React from "react";

function Masonry({ columns, photos }) {
  const cols = new Array(columns).fill(0);

  return (
  <>
  {
    cols.map(()=> {
      return (
        <div>
          {
            photos?.map(photo => {
              
            })
          }
        </div>
      )
    })
  }
  </>
    );
}

export default Masonry;
