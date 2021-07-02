import React from 'react'
import styled from 'styled-components'
import Header from 'components/Header/Header'
import Description from 'components/Description/Description'
import Video from 'components/Video/Video'

const InfoContainer = styled.div`
  display: ${(props) => (props.focus ? 'block' : 'none')};
  transition: 1s ease-in-out;
  position: relative;
  left: 0px;
  width: 100vw;
  top: 0;
  z-index: 5;
  background-color: white;
`

const Info = ({ components, focus }) => {
  const renderComponent = (component, i) => {
    const { titel, image, text, url } = component
    switch (component.acf_fc_layout) {
      // Add cases depending on the components in WordPress.
      case 'header':
        return <Header title={titel} image={image?.sizes?.medium} text={text} />
      case 'description':
        return (
          <Description
            id={i}
            title={titel}
            image={image?.sizes?.medium}
            text={text}
          />
        )
      case 'videoplayer':
        return <Video id={i} url={url} />
      default:
        return null
    }
  }

  return (
    <InfoContainer focus={focus}>
      {components?.map((component, i) => {
        return (
          <React.Fragment key={i}>
            {renderComponent(component, i)}
          </React.Fragment>
        )
      })}
    </InfoContainer>
  )
}

export default Info
