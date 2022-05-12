import {TransactionManagerInterceptor} from "./transaction-manager.interceptor";
import {EDatabaseConnectionType} from "../constants/database-connection-type.enum";

export class InmostTransactionManager extends TransactionManagerInterceptor(EDatabaseConnectionType.Inmost) {}