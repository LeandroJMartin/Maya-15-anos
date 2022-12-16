import React from 'react';

const ErrorForm = ({ msg }: Props) => {
  return (
    <span className="text-red-500 text-xs font-bold pt-1 pl-1 mb-2">{msg}</span>
  );
};

type Props = {
  msg: string;
};

export default ErrorForm;
