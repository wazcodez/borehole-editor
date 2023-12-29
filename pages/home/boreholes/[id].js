import React from "react";
import { useRouter } from "next/router";
import BoreholeEditor from "./../../../components/BoreholeEditor/";
import { getSession } from "next-auth/client";

const BoreholesID = ({ data }) => {
  return (
    <BoreholeEditor
      borehole_id={data.borehole_id}
      borehole_title={data.borehole_title}
      id={data._id}
      store={data.store}
      last_modified={data.last_modified}
    ></BoreholeEditor>
  );
};

BoreholesID.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const session = await getSession({ ctx });
  if (session === null || session === undefined) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: "/auth/signin" });
      ctx.res.end();
    }
  }
  const resp = await fetch(`${process.env.host}/api/boreholes/${query.id}/`, {
    method: "GET",
  });
  const json = await resp.json();
  if (Object.keys(json).length === 0) {
    return { boreholes: [] };
  }
  return { data: json.data[0] };
};

export default BoreholesID;
