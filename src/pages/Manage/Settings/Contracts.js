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
import * as s from "../../../styles/global"
import Loader from '../../../components/Loader'

import { fetchIDOFactoryInfo } from '../../../utils/contract'


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

  const [ isContractsInfoFetching, setIsContractsInfoFetching ] = useState(false)

  const fetchContractsInfo = () => {
    setIsContractsInfoFetching(true)
    fetchIDOFactoryInfo(chainIdToManage, contracts[chainIdToManage].IDOFactoryAddress).then((idoInfo) => {
      console.log('idoInfo', idoInfo)
    }).catch((err) => {
    })
  }
  
  useEffect(() => {
    console.log(contracts, domainSettings)
    if (contracts[chainIdToManage] && contracts[chainIdToManage].IDOFactoryAddress && contracts[chainIdToManage].TokenLockerFactoryAddress) {
      setHasChainContracts(true)
      fetchContractsInfo()
    } else {
      setHasChainContracts(false)
    }
  }, [ chainIdToManage ])


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
            {isContractsInfoFetching ? (
              <s.Text small info>
                {`Fetching contracts settings...`}
                {` `}
                <Loader />
              </s.Text>
            ) : (
              <>
              </>
            )}
          </>
        )}
      </ContentWrapper>
    </>
  )
}