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
  
  useEffect(() => {
    console.log(contracts, domainSettings)
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
      </ContentWrapper>
    </>
  )
}