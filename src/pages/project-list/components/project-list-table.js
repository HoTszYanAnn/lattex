import React, { useEffect, useState } from 'react'
import { forwardRef } from 'react';
import MaterialTable, { MTableToolbar, MTableBody, MTableHeader } from 'material-table'
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Fab,
  IconButton,
  Paper,
  Box,
  withWidth
} from '@material-ui/core';
import { APP_ROUTES } from '../../../config';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ProjectListTable = ({ documents, loading, deleteDocument }) => {
  const history = useHistory();
  const theme = useTheme();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        isLoading={loading}
        data={documents}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Description', field: 'description', cellStyle: { width: '400px', minWidth: '400px' }, headerStyle: { width: '400px', minWidth: '400px' } },
          { title: 'Last Edited Time', field: 'pushedAt', render: rowData => moment(rowData.pushedAt).fromNow(), defaultSort: 'desc', },
        ]}
        title="Documents"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => history.push(APP_ROUTES.EDITOR(rowData.name))
          },
          {
            icon: 'delete',
            tooltip: 'Delete Document',
            onClick: (event, rowData) => deleteDocument(rowData.name),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          minBodyHeight: '75vh',
          maxBodyHeight: '75vh',
          paging: false,
          draggable: false,
          thirdSortClick: false,
          searchFieldAlignment: 'left',
          showTitle: false,
          searchFieldStyle: {
            width: width > 960 ? 960 - 24 - 24 - 48 : width - 24 * 4,
          },
          headerStyle: {
            backgroundColor: theme.palette.primary.main,
          }
        }}
        components={{
          Container: props => (
            <>
              <Paper children={props.children.slice(0, 3)} style={{ ...props.style, backgroundColor: theme.palette.primary.main }} elevation={4} />
              <Box mb={3} />
              <Paper children={props.children.slice(3, props.children.length)} style={props.style} elevation={4} />
            </>
          ),
          Action:
            props => {
              if (props.action.icon === 'edit') {
                return (
                  <Fab
                    onClick={(event) => props.action.onClick(event, props.data)}
                    color="primary"
                    size='small'
                    style={{ margin: '.5rem' }}
                  >
                    <Edit style={{ color: 'white' }} />
                  </Fab>
                )
              }
              if (props.action.icon === 'delete') {
                return (
                  <Fab
                    onClick={(event) => props.action.onClick(event, props.data)}
                    size='small'
                    style={{ margin: '.5rem' }}
                  >
                    <DeleteIcon style={{ color: '#888888' }} />
                  </Fab>
                )
              }
              return <></>
            }

        }}
      />
    </>
  )
}

export default withWidth()(ProjectListTable)