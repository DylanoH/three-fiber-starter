import React, { useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import Loader from './Loader'
import HaasjeOver from './assets/HaasjeOver'
import { Vector3 } from 'three'
import Ground from './assets/Ground'
import Environment from './assets/Environment'
import ApiContextProvider from './utils/ApiContextProvider'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { gsap } from 'gsap'
import Info from 'components/Info/Info'
import ResetButton from 'components/reset-button/ResetButton'

const App = () => {
  const [focus, setFocus] = useState(false)
  const [cameraPos, setCameraPos] = useState(new Vector3(0, 0, 0))
  const [title, setTitle] = useState('')
  const [infoComponents, setInfoComponents] = useState()

  const myCamera = useRef(null)
  const myControls = useRef(null)

  const displayData = (object) => {
    const { userData } = object
    setTitle(userData.name)
    setInfoComponents(userData.components)
  }

  // Target the clicked object and position next to it
  const playFocusAnimations = (x, y, z) => {
    // save camera position before animation
    setCameraPos(
      new Vector3(
        myCamera.current.position.x,
        myCamera.current.position.y,
        myCamera.current.position.z
      )
    )
    gsap.to(myCamera.current.position, {
      duration: 2,
      x: 20,
      y: 20,
      z: 20,
      ease: 'expo',
      onUpdate: () => {
        myCamera.current.updateProjectionMatrix()
      },
    })
    gsap.to(myControls.current.target, {
      duration: 2,
      x: x,
      y: y + 30,
      z: z,
      ease: 'expo',
      onUpdate: () => {
        myControls.current.update()
      },
    })
    setFocus(true)
  }

  // Put camera back in it's original position and target 0
  const playBackAnimations = () => {
    gsap.to(myCamera.current.position, {
      duration: 2,
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      ease: 'expo',
      onUpdate: () => {
        myCamera.current.updateProjectionMatrix()
      },
    })
    gsap.to(myControls.current.target, {
      duration: 2,
      x: 0,
      y: 0,
      z: 0,
      ease: 'expo',
      onUpdate: () => {
        myControls.current.update()
      },
      onComplete: () => {
        setFocus(false)
      },
    })
  }

  return (
    <>
      <Canvas>
        {/* Perspective camera */}
        <PerspectiveCamera
          ref={myCamera}
          makeDefault
          position={[250, 200, 250]}
          zoom={1.5}
        />

        {/* Orbit Controls */}
        {/* Check out Orbit Controls and other usefull functionalities at 'https://docs.pmnd.rs/drei/introduction' */}
        <OrbitControls
          ref={myControls}
          camera={myCamera.current}
          autoRotate={!focus}
          autoRotateSpeed={0.5}
          enabled={!focus}
          enableZoom={false}
        />
        {/* Lighting */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* Render model components as children of Suspense. Suspense renders 
            a loader component if the models are not loaded yet. After importing a GLB / GLTF in the project, 
            compress them using 'npx gltf-pipeline -i Groundplane.glb -o compressed-groundplane.glb -d'
            Then go to 'https://gltf.pmnd.rs/' to check the model and copy the import code into a new component */}
        <Suspense fallback={<Loader />}>
          <ApiContextProvider>
            <Environment background />
            <HaasjeOver
              playFocusAnimations={playFocusAnimations}
              onClick={(e) => displayData(e.object.parent)}
            />
            <Ground />
          </ApiContextProvider>
        </Suspense>
        {/* Render effect components as children of EffectComposer. */}
        {/* Check out effects at 'https://docs.pmnd.rs/react-postprocessing/introduction' */}
        <EffectComposer>{<Vignette darkness={0.7} />}</EffectComposer>
      </Canvas>
      <Info components={infoComponents} title={title} focus={focus} />
      <ResetButton playBackAnimations={playBackAnimations}>
        Reset Camera
      </ResetButton>
    </>
  )
}

export default App
