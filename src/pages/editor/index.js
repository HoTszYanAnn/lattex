import React, { useState, useEffect } from 'react'
import { UIEditor, LatexCompiler } from './components'
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
  makeStyles,
  withWidth,
  CircularProgress,
  Tooltip,
  Fab
} from "@material-ui/core";
import { toLatexCode } from './function'
import { useQuery, useMutation } from "react-apollo";
import { onGqlError } from "../../function"
import gql from 'graphql-tag'
import { connect } from "react-redux";
import Loading from '../../components/loading'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const DOCUMENT_FRAGMENT = gql`
  fragment DocumentFragment on Document {
    id
    name
    description
    pushedAt
    createdAt
    isPrivate
    url
    latex{
      documentclass
      titles{
        title
        author
        date
        always_today
      }
      setting{
        fontSize
        lineHeight
        firstLineIndentation
      }
      contents{
        id
        code
        text
      }
      images{
        name
        oid
        byteSize
      }
      latex_code
    }
  }
`
const GET_DOCUMENT_GQL = gql`
  ${DOCUMENT_FRAGMENT}
  query($name: String!) {
    document(name: $name) {
      ...DocumentFragment
    }
  }
`;

const UPDATE_DOCUMENT_GQL = gql`
  ${DOCUMENT_FRAGMENT}
  mutation($name: String!, $input: LaTeXDocUpdateInput!) {
    document(name: $name) {
      updateLaTeX(input: $input){
        ...DocumentFragment
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: '50px',
    position: 'fixed',
    top: '50px',
    zIndex: 9999,
  },
  editor: {
    height: 'calc(100vh - 50px)',
    backgroundColor: '#efefef'
  },
  compiler: {
    height: 'calc(100vh - 50px)',
    backgroundColor: 'grey',
  },
}));

const Editor = ({ width, match }) => {
  const classes = useStyles()
  const [showCompiler, setShowCompiler] = useState(!['xs', 'sm', 'md'].includes(width))
  const [doc, setDoc] = useState(null)
  const [key, setKey] = useState(uuidv4())
  const [loading, setLoading] = useState(true)

  const { params } = match;

  const onGqlCompleted = (data) => {
    console.log(data)

    setDoc(data.document)
    setLoading(false)
  }

  const onUpdateGqlCompleted = (data) => {
    console.log(data)

    setDoc(data.document.updateLaTeX)
    setKey(uuidv4())
    setLoading(false)
  }

  const { loading: getDocumentGqlLoading } = useQuery(GET_DOCUMENT_GQL, {
    onCompleted: onGqlCompleted,
    onError: onGqlError,
    variables: {
      name: params.id
    },
    fetchPolicy: 'no-cache'
  })

  const [updateDocument, { loading: updateDocumentGqlLoading }] = useMutation(UPDATE_DOCUMENT_GQL, {
    onCompleted: onUpdateGqlCompleted,
    onError: onGqlError,
    variables: {
      name: params.id
    },
    fetchPolicy: 'no-cache'
  })

  const changeShowCompiler = () => {
    setShowCompiler(!showCompiler)
  }

  const pushAndCompile = (input) => {
    //push to github
    console.log(input)
    setLoading(true)
    updateDocument({
      variables: {
        input
      }
    })
  }

  return (
    <>
      <Loading loading={loading} />
      {!loading &&
        <>
          <Box
            style={{
              position: 'absolute',
              top: 'calc(60px + 48px + 16px)',
              left: showCompiler
                ? ['xs', 'sm', 'md'].includes(width)
                  ? 'calc(100vw - 10px - 16px)'
                  : 'calc(50vw - 10px - 16px)'
                : 'calc(100vw - 10px - 16px)',
              transform: "translateX(-100%)",
              zIndex: 500
            }}>
            <Tooltip title='Show Compiler?' aria-label='Show Compiler?' placement="top">
              <Fab size="medium" color="primary" onClick={changeShowCompiler}>
                {showCompiler ? <VisibilityIcon style={{ color: 'white' }} /> : <VisibilityOffIcon style={{ color: 'white' }} />}
              </Fab>
            </Tooltip>
          </Box>
          <Grid container>
            <Grid item xs={12} lg={showCompiler ? 6 : 12} className={classes.editor} style={{ display: showCompiler ? ['xs', 'sm', 'md'].includes(width) ? 'none' : 'block' : 'block' }}>
              <UIEditor
                doc={doc}
                showCompiler={showCompiler}
                changeShowCompiler={changeShowCompiler}
                pushAndCompile={pushAndCompile}
                doc={doc}
                updateDocument={updateDocument}
                width={width}
              />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.compiler} style={{ display: showCompiler ? 'block' : 'none' }}>
              <LatexCompiler doc={doc} key={key} />
            </Grid>
          </Grid>
        </>
      }
    </>
  )
}
const mapStateToProps = ({ USER_PROFILE }) => ({ USER_PROFILE });

export default connect(mapStateToProps)(withWidth()(Editor))