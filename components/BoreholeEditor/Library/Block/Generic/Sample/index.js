import { Edit as GenericEdit } from "./../index";

export const View = ({ data }) => {
  return <div>{data}</div>;
};

export const Edit = ({ children }) => {
  return <GenericEdit>{children}</GenericEdit>;
};
