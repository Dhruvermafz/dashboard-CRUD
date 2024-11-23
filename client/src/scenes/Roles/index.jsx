import React from "react";
import { Box, useTheme, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetRolesQuery } from "state/api";
import { Header } from "components";

// Roles Component
const Roles = () => {
  // theme
  const theme = useTheme();
  // get data
  const { data, isLoading } = useGetRolesQuery();

  // Handle dropdown changes
  const handlePermissionChange = (roleId, selectedPermissions) => {
    console.log(
      `Role ID: ${roleId}, Selected Permissions: ${selectedPermissions}`
    );
    // Add logic to update the permission (e.g., API call or state update)
  };

  // data columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 1,
      renderCell: ({ row }) => {
        // Ensure permissions is always an array
        const permissionsArray = Array.isArray(row.permissions)
          ? row.permissions // Use as-is if already an array
          : typeof row.permissions === "string"
          ? row.permissions.split(",").map((item) => item.trim()) // Split string into an array
          : []; // Default to an empty array if null/undefined

        return (
          <Select
            size="small"
            fullWidth
            multiple
            value={permissionsArray} // Bind the current permissions array
            onChange={(e) => handlePermissionChange(row.id, e.target.value)} // Update on change
            renderValue={(selected) => selected.join(", ")} // Display selected permissions as a comma-separated list
          >
            {permissionsArray.map((permission) => (
              <MenuItem key={permission} value={permission}>
                {permission}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="ROLES" subtitle="List of All Roles" />

      {/* Content */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {/* Grid table */}
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Roles;
