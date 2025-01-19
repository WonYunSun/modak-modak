'use client'

import Button from "@components/common/Button";

const NonUserQueryJoin = () => {
    const onQueryJoin = async () => {
    };

  return (
    <div className="px-5 w-full absolute bottom-0">
      <Button type="button" className="full-btn" onClick={onQueryJoin} label="로그인하고 모임 가입하기"/>
    </div>
  );
}

export default NonUserQueryJoin