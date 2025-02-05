import { mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient, testClient, walletClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/base.js'
import {
  type FinalizeWithdrawalTransactionParameters,
  writeFinalizeWithdrawalTranasction,
} from './writeFinalizeWithdrawalTransaction.js'

// From https://etherscan.io/tx/0x33b540f3ae33049ecb19c83a62fe15ad41dc38ccce4cf0eaf92c55431031f1b5
test('succesfully submits finalizeWithdrawalTransaction', async () => {
  const withdrawal: FinalizeWithdrawalTransactionParameters = {
    nonce: 1766847064778384329583297500742918515827483896875618958121606201292641795n,
    sender: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
    target: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
    value: 335000000000000000000n,
    gasLimit: 100000n,
    data: '0x01',
  }

  const hash = await writeFinalizeWithdrawalTranasction(walletClient, {
    ...baseAddresses,
    withdrawal,
    account: accounts[0].address,
  })
  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.status).toEqual('success')
})
