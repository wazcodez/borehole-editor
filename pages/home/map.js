import React, { useCallback, useState, useRef, useEffect } from "react";
import Layout from "./../../components/Layout/";
import MapProvider from "./../../components/common/Map";
import { getSession } from "next-auth/client";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

const MapPage = ({ missing, boreholes, user }) => {
  return (
    <Layout user={user} location={"/home/map"}>
            <MapProvider data={boreholes} missing={missing}/>
    </Layout>
  );
};

MapPage.getInitialProps = async (ctx) => {
  const session = await getSession({ ctx });
  if (session === null || session === undefined) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: "/auth/signin" });
      ctx.res.end();
    }
  }

  const res = await fetch(`${process.env.host}/api/boreholes/maps`, {
    method: "GET",
  });
  const data = await res.json();
  if (Object.keys(data).length === 0) {
    return { boreholes: [] };
  }
  return { 
    missing: data.locations_missing,
    boreholes: data.locations,
    user: session.user 
  };
};

export default MapPage;
