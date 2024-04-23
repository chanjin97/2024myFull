import React from "react";
import Button from "../../components/Button";

function MainPage() {
  return (
    <div>
      MainPage
      <Button textOnly={false} className="small" data="test">
        클릭
      </Button>
    </div>
  );
}

export default MainPage;
