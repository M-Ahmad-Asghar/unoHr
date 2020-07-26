import {
  ADD_NEW_DOCUMENTS,
  ADD_NEW_DOCUMENTS_ERR,
  GET_DOCUMENTS,
  GET_DOCUMENTS_ERR,
  GET_UNVERIFIEDDOCUMENTS_ERR,
  GET_UNVERIFIEDDOCUMENTS,
  GET_AUTOPOPULATE_ERR,
  GET_AUTOPOPULATE,
  GET_TEMPLATESCHEMA,
  GET_TEMPLATESCHEMA_ERR,
  GET_SINGLEEMPLOYEE,
  ADD_NEW_UNVERIFIED_DOCUMENTS,

  SAVE_EMPLOYEE_PAPERWORKS,
  SAVE_EMPLOYEE_PAPERWORKS_ERR,
  SAVE_EMPLOYER_PAPERWORKS,
  SAVE_EMPLOYER_PAPERWORKS_ERR
} from "../actions/NewSystemDocuments";

var initialState = {
  systemdocuments: [],
  unverifieddocuments: [],
  unverfied_loader: "some",
  isLoading: "null",
  loader: "null",
  documentLoader: "null",
  autopopulate_loader: "safd",
  autopopulate: {},
  employee: {},
  templateSchema: {
    properties: {}
  },
  templateSchemaStatus: 'not done',
  schema_loader: "sfd",
  add_verified_doc_loader: "FSA",
  saveEmployeePaperworks: 'not done',
  saveEmployerPaperworks: 'not done'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_DOCUMENTS: {
      return {
        ...state,
        isLoading: "move",
        loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case ADD_NEW_DOCUMENTS_ERR: {
      return {
        ...state,
        isLoading: "error",
        loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_DOCUMENTS: {
      return {
        ...state,
        systemdocuments: action.payload,
        documentLoader: new Date(),
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_DOCUMENTS_ERR: {
      return {
        ...state,
        documentLoader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_UNVERIFIEDDOCUMENTS: {
      return {
        ...state,
        unverifieddocuments: action.payload,
        unverfied_loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_UNVERIFIEDDOCUMENTS_ERR: {
      return {
        ...state,
        unverfied_loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_AUTOPOPULATE: {
      return {
        ...state,
        autopopulate: action.payload,
        autopopulate_loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_AUTOPOPULATE_ERR: {
      return {
        ...state,
        autopopulate_loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_TEMPLATESCHEMA: {
      return {
        ...state,
        templateSchema: action.payload,
        templateSchemaStatus: 'done',
        schema_loader: new Date(),
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_TEMPLATESCHEMA_ERR: {
      return {
        ...state,
        schema_loader: new Date(),
        templateSchemaStatus: 'error',
        saveEmployerPaperworks: 'not done'
      };
    }

    case GET_SINGLEEMPLOYEE: {
      return {
        ...state,
        employee: action.payload,
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case ADD_NEW_UNVERIFIED_DOCUMENTS: {
      return {
        ...state,
        add_verified_doc_loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case SAVE_EMPLOYEE_PAPERWORKS: {
      return {
        ...state,
        saveEmployeePaperworks: 'done',
        schema_loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case SAVE_EMPLOYEE_PAPERWORKS_ERR: {
      return {
        ...state,
        saveEmployeePaperworks: 'error',
        schema_loader: new Date(),
        templateSchemaStatus: 'not done',
        saveEmployerPaperworks: 'not done'
      };
    }

    case SAVE_EMPLOYER_PAPERWORKS: {
      return {
        ...state,
        saveEmployerPaperworks: 'done',
        schema_loader: new Date(),
        saveEmployeePaperworks: 'not done',
        templateSchemaStatus: 'not done',
      };
    }

    case SAVE_EMPLOYER_PAPERWORKS_ERR: {
      return {
        ...state,
        saveEmployerPaperworks: 'error',
        schema_loader: new Date(),
        saveEmployeePaperworks: 'not done',
        templateSchemaStatus: 'not done',
      };
    }

    default:
      return state;
  }
}
