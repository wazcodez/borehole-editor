import React, { useCallback, useState } from "react";
import Layout from "./../../../components/Layout/";
import {
  Avatar,
  TextStyle,
  Card,
  ResourceItem,
  ResourceList,
  Page,
  Button,
  TextContainer,
  TextField,
  Stack,
  Modal,
} from "@shopify/polaris";
import { getSession } from "next-auth/client";

const BoreholeList = ({ items }) => {
  const [sortValue, setSortValue] = useState("DATE_MODIFIED_DESC");
  const finalItems =
    sortValue === "DATE_MODIFIED_DESC"
      ? items.sort(
          (a, b) => Date.parse(b.last_modified) - Date.parse(a.last_modified)
        )
      : items.sort(
          (a, b) => Date.parse(a.last_modified) - Date.parse(b.last_modified)
        );
  return (
    <div>
      <Card>
        <ResourceList
          resourceName={{ singular: "borehole", plural: "boreholes" }}
          sortValue={sortValue}
          showHeader={true}
          totalItemsCount={items.length}
          sortOptions={[
            { label: "Newest update", value: "DATE_MODIFIED_DESC" },
            { label: "Oldest update", value: "DATE_MODIFIED_ASC" },
          ]}
          onSortChange={(selected) => {
            setSortValue(selected);
          }}
          items={finalItems.map((item) => {
            return {
              id: item._id,
              url: `boreholes/${item._id}`,
              name: `${item.borehole_title}`,
              location: `${item.borehole_id}`,
              date: item._last_modified,
            };
          })}
          renderItem={(item) => {
            const { id, url, name, location } = item;
            const media = <Avatar customer size="medium" name={name} />;
            const shortcutActions = url
              ? [
                  {
                    content: "Edit",
                    accessibilityLabel: `Edit ${name}`,
                    url: url,
                  },
                ]
              : null;

            return (
              <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`Edit for ${name}`}
                shortcutActions={shortcutActions}
              >
                <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{location}</div>
              </ResourceItem>
            );
          }}
        />
      </Card>
    </div>
  );
};

const Boreholes = ({ boreholes, user }) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boreholeName, setBoreholeName] = useState("");
  const [boreholeId, setBoreholeId] = useState("");
  const [allBoreholes, setBoreholes] = useState(boreholes);

  const handleBoreholeName = useCallback((newValue) =>
    setBoreholeName(newValue)
  );
  const handleboreholeId = useCallback((newValue) => setBoreholeId(newValue));

  const handleOpen = useCallback(() => setActive(true), []);
  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  return (
    <Layout user={user} location={"/home/boreholes/"}>
      <div>
        <Page
          fullWidth
          title={"Boreholes"}
          primaryAction={
            <Button onClick={handleOpen} primary>
              Add Borehole
            </Button>
          }
        >
          <BoreholeList items={allBoreholes} />
          <Modal
            instant
            open={active}
            onClose={handleClose}
            title="Add Borehole"
            primaryAction={{
              content: "Add",
              disabled: loading ? true : false,
              onAction: () => {
                setLoading(true);
                let req = fetch(`${process.env.host}/api/boreholes/`, {
                  method: "POST",
                  body: JSON.stringify({
                    borehole_title: boreholeName,
                    borehole_id: boreholeId,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setBoreholes([data.data, ...boreholes]);
                  })
                  .finally(() => {
                    setActive(false);
                    setLoading(false);
                  });
              },
            }}
          >
            <Modal.Section>
              <Stack.Item fill>
                <TextField
                  name={"Borehole Name"}
                  label="Borehole Name"
                  value={boreholeName}
                  onChange={handleBoreholeName}
                />
                <TextField
                  name={"Borehole Id"}
                  label="Borehole Id"
                  value={boreholeId}
                  onChange={handleboreholeId}
                />
              </Stack.Item>
            </Modal.Section>
          </Modal>
        </Page>
      </div>
    </Layout>
  );
};

Boreholes.getInitialProps = async (ctx) => {
  const session = await getSession({ ctx });
  if (session === null || session === undefined) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: "/auth/signin" });
      ctx.res.end();
    }
  }

  const res = await fetch(`${process.env.host}/api/boreholes/`, {
    method: "GET",
  });
  const json = await res.json();
  if (Object.keys(json).length === 0) {
    return { boreholes: [] };
  }
  return { boreholes: json.data, user: session.user };
};

export default Boreholes;
