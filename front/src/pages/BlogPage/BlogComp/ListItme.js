import React from "react";

function ListItme({ item, idx, no }) {
  return (
    <li key={idx}>
      {no}. {item.title} / {item.user.name} / {item.user.email}
    </li>
  );
}

export default ListItme;
