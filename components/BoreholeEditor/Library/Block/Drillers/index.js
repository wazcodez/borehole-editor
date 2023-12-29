import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import BlockRowViewLayout from "./../BlockRowViewLayout";
import { Tag } from "antd";
import SmartTag from "./../../../../common/SmartTag/";
import DescriptionInput from "./../../../../common/DataEntry/DescriptionInput/";
import TextInput from "./../../../../common/DataEntry/TextInput/";
import Terms from "./../../../../../util/terms";
import moment from "moment";
import { DateInput } from "@blueprintjs/datetime";
import { TimePrecision } from "@blueprintjs/datetime";
import Label from "./../../../../common/Label";

export default {
  type: "Drillers",
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="well" />,
  multipleAllowed: false,
  schema: {
    type: "Drillers",
    level: Terms.Block.Level.Borehole,
    driller: "",
    helper: "",
    drill_rig: "",
    start_date: null,
    end_date: null,
    description: "",
  },
  view: (_data) => {
    const data = { ..._data };
    const current_start_date = new Date(data.start_date);
    const start_date_ = current_start_date.toDateString();
    const icon =
      data.driller || data.helper ? (
        <Icon name={"well"} />
      ) : (
        <Icon name={"well"} style={"text-gray-500"} />
      );
    const drillrig =
      data.drill_rig ? (
        <Tag
          color="blue"
          style={{
            display: "flex",
            alignItems: "center",
            height: "70%",
            lineHeight: "auto",
          }}
        >{`${data.drill_rig}`}</Tag>
      ) : (
        <Tag
          style={{
            display: "flex",
            alignItems: "center",
            height: "70%",
            lineHeight: "auto",
          }}
        >
          Drill Rig
        </Tag>
      );
    const _start_date = start_date_? (
        <div>{`Start Date: ${start_date_}`}</div>
      ) : (
        <span className="text-gray-500">Drilling Start Date</span>
      );

    const subtext = data.description ? (
      <p className="text-xs whitespace-pre-wrap">{data.description}</p>
    ) : (
      <p className="text-xs text-gray-500">Notes... </p>
    );

    return (
      <BlockRowViewLayout icon={icon}>
        <div className="flex flex-col flex-wrap">
          <div
            className="flex flex-row flex-wrap"
            style={{ alignItems: "center" }}
          >
            <div>{drillrig}</div>
            <SmartTag
              value={data.driller}
              placeholder={"Driller"}
              heading={`${data.driller}`}
            />
            <SmartTag
              value={data.helper}
              placeholder={"Helper"}
              heading={`${data.helper}`}
            />
            <div className="flex flex-row flex-wrap">{_start_date}</div>
          </div>
          <div className="flex flex-row flex-wrap">{subtext}</div>
        </div>
      </BlockRowViewLayout>
    );
  },
  editor: (data, onUpdate, idx) => {
    const { start_date } = data;
    var startedDate =
      start_date === null ? null : moment(start_date).toDate();
    const { end_date } = data;
    var endedDate =
      end_date === null ? null : moment(end_date).toDate();
    return (
      <Edit>
        <EditBlock title={"Details"}>
          <TextInput
            heading={"Driller"}
            value={data.driller}
            onUpdate={onUpdate}
            data={data}
            valueKey="driller"
            placeholder={"Driller name"}
          />
          <TextInput
            heading={"Helper"}
            value={data.helper}
            onUpdate={onUpdate}
            data={data}
            valueKey="helper"
            placeholder={"Helper name"}
          />
          <TextInput
            heading={"Drill Rig"}
            value={data.drill_rig}
            onUpdate={onUpdate}
            data={data}
            valueKey="drill_rig"
            placeholder={"Drill Rig"}
          />
          <Label title={"Drilling Start Date"} />
          <DateInput
            formatDate={(date) =>
              moment(date).format("MMMM DD, YYYY hh:mm A")
            }
            onChange={(val) => {
              onUpdate({
                ...data,
                start_date: val,
              });
            }}
            fill={true}
            parseDate={(s) => new Date(s)}
            placeholder={"DD-MM-YYYY"}
            value={
              start_date === null
                ? null
                : moment(start_date).toDate()
              }
            timePrecision={TimePrecision.MINUTE}
          />
          <Label title={"Drilling End Date"} />
          <DateInput
            formatDate={(date) =>
              moment(date).format("MMMM DD, YYYY hh:mm A")
            }
            onChange={(val) => {
              onUpdate({
                ...data,
                end_date: val,
              });
            }}
            fill={true}
            parseDate={(s) => new Date(s)}
            placeholder={"DD-MM-YYYY"}
            value={
              end_date === null
                ? null
                : moment(end_date).toDate()
              }
            timePrecision={TimePrecision.MINUTE}
          />
        </EditBlock>

        <EditBlock title={"Notes"}>
          <DescriptionInput
            heading={"Notes"}
            description={data.description}
            onUpdate={onUpdate}
            data={data}
            placeholder={"Notes (if any)"}
          />
        </EditBlock>
      </Edit>
    );
  },
};
