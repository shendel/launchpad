import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useApplicationContext } from '../../../context/applicationContext'
import { SUPPORTED_NETWORKS, SUPPORTED_CHAIN_IDS } from '../../../connectors'
import styled from 'styled-components'
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Accordion as AccordionMUI,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { NumberField } from "../../../components/FormField"
import * as s from "../../../styles/global"
import Loader from '../../../components/Loader'

import {
  fetchIDOFactoryInfo,
  callIDOFactoryContract,
} from '../../../utils/contract'

import {
  isAddress,
  switchInjectedNetwork,
  isZeroAddress,
  tokenAmountFromWei,
  tokenAmountToWei,
} from '../../../utils/utils'

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${({ disabled }) => (disabled ? `
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.6;
    ` : ''
  )};
`


export default function Contracts() {
  const { library, chainId, account, connector } = useWeb3React()
  const {
    domain,
    domainSettings: {
      contracts
    },
    domainSettings,
    triggerDomainData,
  } = useApplicationContext()

  const [isLoading, setIsLoading] = useState(false)
  
  const [ chainIdToManage, setChainIdToManage ] = useState(0)
  
  const [ hasChainContracts, setHasChainContracts ] = useState(false)

  const [ isIdoInfoFetching, setIsIdoInfoFetching ] = useState(false)
  const [ isIdoInfoError, setIsIdoInfoError ] = useState(false)
  const [ idoInfo, setIdoInfo ] = useState(false)
  const [ IDOFeeWallet, setIDOFeeWallet ] = useState(``)
  const [ IDOFeeWalletSaving, setIDOFeeWalletSaving ] = useState(false)
  const [ IDOFeeAmount, setIDOFeeAmount ] = useState(``)
  const [ IDOFeeAmountSaving, setIDOFeeAmountSaving] = useState(false)
  
  const fetchIdoInfo = () => {
    setIsIdoInfoFetching(true)
    setIsIdoInfoError(false)
    setIdoInfo(false)
    fetchIDOFactoryInfo(chainIdToManage, contracts[chainIdToManage].IDOFactoryAddress).then((idoInfo) => {
      setIdoInfo(idoInfo)
      setIDOFeeWallet(idoInfo.feeWallet)
      setIDOFeeAmount(tokenAmountFromWei(idoInfo.feeAmount, idoInfo.feeTokenDecimals))
      setIsIdoInfoFetching(false)
    }).catch((err) => {
      setIsIdoInfoFetching(false)
      setIsIdoInfoError(true)
    })
  }
  
  useEffect(() => {
    console.log(contracts, domainSettings)
    if (contracts[chainIdToManage] && contracts[chainIdToManage].IDOFactoryAddress && contracts[chainIdToManage].TokenLockerFactoryAddress) {
      setHasChainContracts(true)
      fetchIdoInfo()
    } else {
      setHasChainContracts(false)
    }
  }, [ chainIdToManage ])

  const saveFeeWallet = async () => {
    setIsLoading(true)
    setIDOFeeWalletSaving(true)
    callIDOFactoryContract({
      library,
      address: contracts[chainIdToManage].IDOFactoryAddress,
      account,
      method: `setFeeWallet`,
      params: [IDOFeeWallet],
      onReceipt: () => {
        setIdoInfo({
          ...idoInfo,
          feeWallet: IDOFeeWallet,
        })
      },
      onHash: (hash) => {
        console.log('saveContractsData hash: ', hash);
      },
    }).then(() => {
      setIsLoading(false)
      setIDOFeeWalletSaving(false)
    }).catch((err) => {
      console.log('Fail save fee address', err)
      setIsLoading(false)
      setIDOFeeWalletSaving(false)
    })
  }
  const saveFeeAmount = async () => {
  }
  
  const switchToNetwork = async (switchToId) => {
    setIsLoading(false)
    try {
      await switchInjectedNetwork(switchToId)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ContentWrapper disabled={isLoading}>
        <Typography variant="h6">Manage contracts</Typography>

        <s.SpacerSmall />

        <InputLabel id="selectedNetworkLablel">Blockchain</InputLabel>
        <Select
          labelId="selectedNetworkLable"
          id="selectedNetwork"
          value={chainIdToManage}
          label="Network"
          onChange={(e) => {
            setChainIdToManage(e.target.value);
          }}
        >
          <MenuItem value={0}>{`Select blockchain`}</MenuItem>
          {SUPPORTED_CHAIN_IDS.map((chainId) => (
            <MenuItem key={chainId} value={chainId}>{SUPPORTED_NETWORKS[chainId].name}</MenuItem>
          ))}
        </Select>

        <s.SpacerSmall />
        {chainIdToManage !== 0 && !hasChainContracts && (
          <>
            <s.Text small warning>
              {`This blockchain not configured. Deploy contracts first`}
            </s.Text>
          </>
        )}
        {chainIdToManage !== 0 && hasChainContracts && (
          <>
            {/* IDOFactory */}
            {isIdoInfoFetching ? (
              <s.Text small info>
                {`Fetching IDOFactory settings...`}
                {` `}
                <Loader />
              </s.Text>
            ) : (
              <>
                {isIdoInfoError ? (
                  <s.Text small error>{`Fail fetch IDOFactory settings`}</s.Text>
                ) : (
                  <>
                    {chainId !== chainIdToManage ? (
                      <>
                        <s.Text small warning>{`Switch network for manage contracts`}</s.Text>
                        <s.SpacerSmall />
                        <s.button
                          fullWidth
                          onClick={() => switchToNetwork(chainIdToManage)}
                        >
                          { isLoading ? <Loader /> : `Switch to ${SUPPORTED_NETWORKS[chainIdToManage].name}` }
                        </s.button>
                      </>
                    ) : (
                      <>
                        {idoInfo !== false && (
                          <>
                            <Typography variant="h8">IDO Factory</Typography>
                            {idoInfo.owner.toLowerCase() != account.toLowerCase() ? (
                              <s.Text small error>{`You are not owner of IDOFactory contract`}</s.Text>
                            ) : (
                              <>
                                {chainId !== chainIdToManage ? (
                                  <s.button
                                    fullWidth
                                    onClick={() => switchToNetwork(chainIdToManage)}
                                  >
                                    { isLoading ? <Loader /> : `Switch to ${SUPPORTED_NETWORKS[chainIdToManage].name}` }
                                  </s.button>
                                ) : (
                                  <>
                                    <s.SpacerSmall />
                                    <TextField
                                      label="Wallet for recieve fee"
                                      value={IDOFeeWallet}
                                      onChange={(e) => {
                                        setIDOFeeWallet(e.target.value);
                                      }}
                                      error={Boolean(!isAddress(IDOFeeWallet))}
                                    />
                                    {/*{!isAddress(IDOFeeWallet) && (<s.Text small error>{`Fee wallet address not correct`}</s.Text>)}*/}
                                    <s.SpacerSmall />
                                    <s.button fullWidth
                                      onClick={() => { saveFeeWallet() }}
                                      disabled={isLoading || !isAddress(IDOFeeWallet) || isZeroAddress(IDOFeeWallet)}
                                    >
                                      { IDOFeeWalletSaving ? <Loader /> : `Save wallet for fee`}
                                    </s.button>
                                    <s.SpacerSmall />
                                    {(isZeroAddress(IDOFeeWallet) || isZeroAddress(idoInfo.feeWallet)) ? (
                                      <s.Text small info>{`For set fee amount, specify wallet for recieve fee`}</s.Text>
                                    ) : (
                                      <>
                                        <NumberField
                                          value={IDOFeeAmount}
                                          label={`Fee for create IDO`}
                                          adornment={idoInfo.feeTokenSymbol}
                                          error={Boolean(IDOFeeAmount < 0)}
                                          onChange={async (e) => {
                                            setIDOFeeAmount(e.target.value)
                                          }}
                                        />
                                      </>
                                    )}
                                    <s.SpacerSmall />
                                    <s.button fullWidth
                                      onClick={() => { saveFeeAmount() }}
                                      disabled={isLoading || Boolean(IDOFeeAmount < 0)}
                                    >
                                      { IDOFeeAmountSaving ? <Loader /> : `Save Fee amount`}
                                    </s.button>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {/* LockerFactory */}
          </>
        )}
      </ContentWrapper>
    </>
  )
}