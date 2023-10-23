import {TransactionManagerInterceptor} from "./transaction-manager.interceptor";

export class SharedTransactionManager extends TransactionManagerInterceptor('Shared') {}
