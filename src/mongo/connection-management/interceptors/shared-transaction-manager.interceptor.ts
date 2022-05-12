import {TransactionManagerInterceptor} from "./transaction-manager.interceptor";
import {EDatabaseConnectionType} from "../constants/database-connection-type.enum";

export class SharedTransactionManager extends TransactionManagerInterceptor(EDatabaseConnectionType.Shared) {}
