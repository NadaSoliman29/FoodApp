import React from 'react'

export default function Pagination() {
  return (
   <>
      <nav aria-label="Page navigation example">
  <ul class="pagination pt-3">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {noOfPages.map(pageNo=>
    <li onClick={()=>getAllData(4,pageNo)} class="page-item cursor-pointer"><a class="page-link">{pageNo}</a></li>

    )}
   
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
   
   
   </>
  )
}
