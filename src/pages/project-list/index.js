import React, { useState } from "react"
import ProjectListTable from './components/project-list-table'
import { useQuery, useMutation } from "react-apollo";
import { onGqlError } from "../../function"
import gql from 'graphql-tag'
import { Fab, makeStyles } from "@material-ui/core";
import AddButton from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from "../../config";
import CreateDocumentInputModal from './components/create-document-input-modal'

const GET_DOCUMENTS_GQL = gql`
  query {
    documents {
      id
      name
      description
      pushedAt
      createdAt
      isPrivate
    }
  }
`;

const CREATE_DOCUMENT_GQL = gql`
  mutation($input: DocumentCreateInput!, $path: String!) {
    addDocument(input: $input, path: $path){
      name
    }
  }
`;

const DELETE_DOCUMENT_GQL = gql`
  mutation($name: String!) {
    deleteDocument(name: $name){
      id
      name
      description
      pushedAt
      createdAt
      isPrivate
    }
  }
`;



const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(7),
    right: theme.spacing(4),
  },
}))

const ProjectList = () => {
  const history = useHistory();
  const classes = useStyles();
  const [documents, setDocuments] = useState([])
  const [filename, setFilename] = useState([])
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const onGqlCompleted = (data) => {
    setDocuments(data.documents)
    setFilename(data.documents.map(item => item.name))
  }

  const onDeleteGqlCompleted = (data) => {
    setDocuments(data.deleteDocument)
    setFilename(data.deleteDocument.map(item => item.name))
  }

  const { loading: getDocumentsGqlLoading } = useQuery(GET_DOCUMENTS_GQL, {
    onCompleted: onGqlCompleted,
    onError: onGqlError,
    fetchPolicy: 'no-cache'
  })

  const onCreateGqlCompleted = (data) => {
    console.log(data)
    if (data.addDocument.name) {
      history.push(APP_ROUTES.EDITOR(data.addDocument.name))
    }
  }

  const [CreateDocument, { loading: createDocumentGqlLoading }] = useMutation(CREATE_DOCUMENT_GQL, {
    onCompleted: onCreateGqlCompleted,
    onError: onGqlError,
    fetchPolicy: 'no-cache'
  })

  const [DeleteDocument, { loading: deleteDocumentGqlLoading }] = useMutation(DELETE_DOCUMENT_GQL, {
    onCompleted: onDeleteGqlCompleted,
    onError: onGqlError,
    fetchPolicy: 'no-cache'
  })

  const createDocument = (input, template) => {
    CreateDocument({
      variables: {
        input,
        path: template.path
      }
    })
  }

  const deleteDocument = (name) => {
    DeleteDocument({
      variables: {
        name
      }
    })
  }


  return (
    <>
      <ProjectListTable documents={documents} loading={getDocumentsGqlLoading || deleteDocumentGqlLoading} deleteDocument={deleteDocument} />
      <CreateDocumentInputModal
        open={createModalOpen}
        setOpen={setCreateModalOpen}
        createDocument={createDocument}
        createDocumentGqlLoading={createDocumentGqlLoading}
        filename={filename}
      />
      <Fab className={classes.fab} color='primary' onClick={() => setCreateModalOpen(true)}>
        <AddButton style={{ color: 'white' }} />
      </Fab>
    </>
  )
}

export default ProjectList