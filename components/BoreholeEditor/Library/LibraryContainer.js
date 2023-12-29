import Accordian from "./../../common/Accordian";

const Container = ({ children, title, format = "col" }) => {
  if (format === "row") {
    return (
      <div className="p-2 bg-grey-light flex flex-col border-b border-primaryBorderSoft">
        <Accordian
          title={
            <div className="p-b ml-2 text-primaryText">
              <h4 className="text-md">{title}</h4>
            </div>
          }
        >
          <div className="p-b ml-1 mt-4 mb-4 flex-row">{children}</div>
        </Accordian>
      </div>
    );
  }
  return (
    <div className="p-2 flex flex-col border-b border-primaryBorderSoft">
      <Accordian
        title={
          <div className="p-b ml-2 text-primaryText">
            <h4 className="text-md">{title}</h4>
          </div>
        }
      >
        <div className="p-b ml-1 mt-2 mb-4 flex flex-wrap">{children}</div>
      </Accordian>
    </div>
  );
};

export default Container;
