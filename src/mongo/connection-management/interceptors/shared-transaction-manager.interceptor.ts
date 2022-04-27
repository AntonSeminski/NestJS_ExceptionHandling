import {TransactionManagerInterceptor} from "./transaction-manager.interceptor";
import {DatabaseConnectionTypeEnum} from "../constants/database-connection-type.constants";

export class SharedTransactionManagerInterceptor extends TransactionManagerInterceptor(DatabaseConnectionTypeEnum.SHARED) {}