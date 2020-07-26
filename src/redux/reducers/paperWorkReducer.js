import {
  GET_DOCUMENTS,
  LOADEROFF,
  GET_DOCUMENTS_ERR, 
  EMPLOYER_PAPER_COUNT, 
  EMPLOYER_PAPER_COUNT_ERR, 
  EMPLOYEE_PAPER_COUNT, 
  EMPLOYEE_PAPER_COUNT_ERR,
  GET_PDF_RECORDS,
  GET_PDF_RECORDS_ERR
} from '../actions/paperWorkActions';


var initialState = {
    documents: [],
    employerDocs: [],
    allEmployeeDocs: [],
    allEmployerDocs: [],
    pdfRecords: [],
    loader:"null",
    loading:"null",
    docsCount: 0,
    countStatus: 'not done',
    employeeDocsCount: 0,
    getPdfRecordStatus: 'not done',
    employeeCountStatus: 'not done'
};

export default function(state = initialState, action) {

  switch (action.type) {
    case GET_DOCUMENTS:{
        console.log('docs',action.payload[0]);
        
      return {
         ...state,
         data:action.payload[0]
          };
      }
    case LOADEROFF:{
    
      return {
         ...state,
         loader:new Date()
          };
      }
    case GET_DOCUMENTS_ERR:{
    
      return {
         ...state,
         loading:new Date()
          };
      }

      case EMPLOYER_PAPER_COUNT: {
        return {
          ...state,
          loading: new Date(),
          countStatus: 'done',
          docsCount: action.payload.size,
          employerDocs: action.payload.docs,
          allEmployerDocs: action.payload.allEmployerDocs,
        }
      }

      case EMPLOYER_PAPER_COUNT_ERR: {
        return {
          ...state,
          docsCount: 0,
          employerDocs: [],
          loading: new Date(),
          allEmployerDocs: [],
          countStatus: 'error',
        }
      }

      case EMPLOYEE_PAPER_COUNT: {
        return {
          ...state,
          loader: new Date(),
          employeeCountStatus: 'done',
          documents: action.payload.docs,
          employeeDocsCount: action.payload.size,
          allEmployeeDocs: action.payload.allEmployeeDocs
        }
      }

      case EMPLOYEE_PAPER_COUNT_ERR: {
        return {
          ...state,
          employeeCountStatus: 'error',
          documents: [],
          allEmployeeDocs: [],
          employeeDocsCount: 0,
          loader: new Date()
        }
      }

      case GET_PDF_RECORDS: {
        return {
          ...state,
          loader: new Date(),
          getPdfRecordStatus: 'done',
          pdfRecords: action.payload
        }
      }

      case GET_PDF_RECORDS_ERR: {
        return {
          ...state,
          pdfRecords: [],
          loader: new Date(),
          getPdfRecordStatus: 'error',
        }
      }

   
    default:
      return state;
  }
}
