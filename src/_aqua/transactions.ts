/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.10.3
 *
 */
import type { IFluenceClient as IFluenceClient$$, CallParams as CallParams$$ } from '@fluencelabs/js-client.api';
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$,
} from '@fluencelabs/js-client.api';
    


// Services

// Functions
 
export type Get_node_clockResult = { timestamp: number; }
export function get_node_clock(
    config?: {ttl?: number}
): Promise<Get_node_clockResult>;

export function get_node_clock(
    peer: IFluenceClient$$,
    config?: {ttl?: number}
): Promise<Get_node_clockResult>;

export function get_node_clock(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (xor
                        (call -relay- ("transaction" "get_node_clock") [] results)
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [results])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction$$(
        args,
        {
    "functionName" : "get_node_clock",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "struct",
                    "name" : "FdbClock",
                    "fields" : {
                        "timestamp" : {
                            "tag" : "scalar",
                            "name" : "i64"
                        }
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 
export type Get_success_transactionsResult = { err_msg: string; success: boolean; transactions: { alias: string; data: string; data_key: string; error_text: string; from_peer_id: string; hash: string; host_id: string; meta_contract_id: string; method: string; nonce: number; public_key: string; status: number; timestamp: number; token_id: string; token_key: string; }[]; }
export function get_success_transactions(
    from: number,
    to: number,
    config?: {ttl?: number}
): Promise<Get_success_transactionsResult>;

export function get_success_transactions(
    peer: IFluenceClient$$,
    from: number,
    to: number,
    config?: {ttl?: number}
): Promise<Get_success_transactionsResult>;

export function get_success_transactions(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "from") [] from)
                        )
                        (call %init_peer_id% ("getDataSrv" "to") [] to)
                       )
                       (xor
                        (call -relay- ("transaction" "get_success_transactions") [from to] results)
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [results])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction$$(
        args,
        {
    "functionName" : "get_success_transactions",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "from" : {
                    "tag" : "scalar",
                    "name" : "i64"
                },
                "to" : {
                    "tag" : "scalar",
                    "name" : "i64"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "struct",
                    "name" : "FdbTransactionsResult",
                    "fields" : {
                        "err_msg" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "success" : {
                            "tag" : "scalar",
                            "name" : "bool"
                        },
                        "transactions" : {
                            "tag" : "array",
                            "type" : {
                                "tag" : "struct",
                                "name" : "Transaction",
                                "fields" : {
                                    "method" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "timestamp" : {
                                        "tag" : "scalar",
                                        "name" : "u64"
                                    },
                                    "data" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "public_key" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "alias" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "hash" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "host_id" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "status" : {
                                        "tag" : "scalar",
                                        "name" : "i64"
                                    },
                                    "error_text" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "nonce" : {
                                        "tag" : "scalar",
                                        "name" : "i64"
                                    },
                                    "from_peer_id" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "token_id" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "token_key" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "meta_contract_id" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "data_key" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 
export type Get_all_cron_txsResult = { cron_txs: { address: string; chain: string; data: string; data_key: string; error_text: string; hash: string; meta_contract_id: string; status: number; timestamp: number; token_id: string; token_type: string; topic: string; tx_block_number: number; tx_hash: string; }[]; err_msg: string; success: boolean; }
export function get_all_cron_txs(
    config?: {ttl?: number}
): Promise<Get_all_cron_txsResult>;

export function get_all_cron_txs(
    peer: IFluenceClient$$,
    config?: {ttl?: number}
): Promise<Get_all_cron_txsResult>;

export function get_all_cron_txs(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (xor
                        (call -relay- ("transaction" "get_all_cron_txs") [] results)
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [results])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction$$(
        args,
        {
    "functionName" : "get_all_cron_txs",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "struct",
                    "name" : "FdbCronTxsResult",
                    "fields" : {
                        "cron_txs" : {
                            "tag" : "array",
                            "type" : {
                                "tag" : "struct",
                                "name" : "CronTx",
                                "fields" : {
                                    "timestamp" : {
                                        "tag" : "scalar",
                                        "name" : "u64"
                                    },
                                    "data" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "tx_hash" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "token_type" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "hash" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "status" : {
                                        "tag" : "scalar",
                                        "name" : "i64"
                                    },
                                    "token_id" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "error_text" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "address" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "chain" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "tx_block_number" : {
                                        "tag" : "scalar",
                                        "name" : "u64"
                                    },
                                    "topic" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "meta_contract_id" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "data_key" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    }
                                }
                            }
                        },
                        "err_msg" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "success" : {
                            "tag" : "scalar",
                            "name" : "bool"
                        }
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

/* eslint-enable */