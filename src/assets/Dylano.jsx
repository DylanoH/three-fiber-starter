/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { Canvas, useFrame } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { ApiContext } from '../utils/ApiContextProvider'
import { linkPost } from '../utils/linkPost'
export default function Model(props) {
  const [active, setActive] = useState(false)

  const { posts } = useContext(ApiContext)

  const [post, setPost] = useState()

  useEffect(() => {
    document.body.style.cursor = active ? 'pointer' : 'auto'
  }, [active])

  useEffect(() => {
    setPost(linkPost(posts, group.current.userData.name))
  }, [posts])

  const group = useRef(null)
  const { nodes, materials } = useGLTF('/assets/compressed-dylano.glb')

  let position
  if (group.current !== null) position = group.current.position
  console.log('group', group)
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={group}
        castShadow
        receiveShadow
        geometry={nodes.Dylano.geometry}
        material={materials['Material #282']}
        // position={props.position}
        position={[105.1739, 0, -183.56001]}
        userData={{
          name: post?.acf?.description,
          body: post?.acf?.description,
          img: post?.acf?.picture.sizes.large
        }}
        onClick={() =>
          props.playFocusAnimations(position.x, position.y, position.z)
        }
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
      />
    </group>
  )
}

useGLTF.preload('/assets/compressed-dylano.glb')

// functie return uniek cijfer tussen 1 en aantal posts dat nog niet geweest is

// functie ()

// aantal totale vragen
// Welke vraag er al geweest is

// array met huidige vraag
// zit dit getal al in de array? niet erin duwen
// wel? erin duwen

// Als die er niet in zit? return dat cijfer

// renderquestion -> rendercounter functie