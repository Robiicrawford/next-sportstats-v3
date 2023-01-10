// profile photo upload modal

import React, {useState, useEffect} from 'react'

import { Box, Center, Button, Spinner  } from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

import Dropzone, {useDropzone} from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'

import Auth from '@aws-amplify/auth';
import { useAuth } from "../../hooks/use-auth";

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    // create a view into the buffer
    var ia = new Uint8Array(ab);
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

export const PhotoUploadModal = ({ssuid}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const auth = useAuth();


  const [image, setimage] = useState<any>(false)

  const [imgSet, setImg] = useState({scale:1})

  const [loading, setLoading] = useState(false)

  const [status, setStatus] = useState('start')

  const [int , setInt] = useState<any>(0)

  const [editor, setEditor] = useState<any>(false)

  const startTimer = () => {
    const current = setInterval(() => {
    //  refetch()
    }, 1000)        
    setInt(current)
  }

  const stopTimer = () => {
    clearInterval(int)
    onClose()
  }

  const updateUser = async()=>{
      var getNewData = await Auth.currentAuthenticatedUser({ bypassCache: true })
  //    setUser(getNewData)
  }

  useEffect(()=> {
    if(status === 'upload') {
      setStatus('done')
      updateUser()
      stopTimer()
    }
  },[])

  const handleDrop = (e) => {
    setimage(e[0])
  }  

  function percentage(partialValue, totalValue) {
    return (partialValue) / totalValue;
  } 

  const setEditorRef = (editor) => (setEditor(editor))

  const handleUpload = async() =>{
    setLoading(true)

    const baseURL = 'https://2tdxe2ivhf.execute-api.us-west-2.amazonaws.com/beta'

    const base64:any = await editor.getImage().toDataURL()

    const getURL =  await fetch(`${baseURL}/photo-upload`, {
      method: 'POST',
      body: JSON.stringify({
        fileType: base64.split(',')[0].split(':')[1].split(';')[0],
        ssuid: auth?.user?.attributes?.['custom:ssuid'],
        type:'profile'
      })
    });
    var url = await getURL.json();

    const blob = await dataURItoBlob(base64)
   
    const post =  await fetch(url.uploadURL, {
      method: 'PUT',
      body: blob
    }); 

    const up = await post.status
    console.log(up)
    if(up) {
      setStatus('upload')
      startTimer()    
    }
   
  }

  return (
     <>
      <Button variant='link' onClick={onOpen} >
        Update photo
      </Button>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a new photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {!loading ?
                <>
                  <Box 
                    justifyContent='center'
                    my={2} w='100%' py={[2,3,4]}
                   >
                    <Dropzone
                      onDrop={(e)=>handleDrop(e)}
                      maxSize={5242880}
                    //  noClick
                      noKeyboard
                      accept={{'image/png': ['.png'],'image/jpeg': ['.jpeg'],}}
                      maxFiles={1}
                 //     style={{ width: '250px', height: '250px', margin:'auto'}}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} style={{textAlign:'center'}}>
                          <AvatarEditor 
                            ref={setEditorRef}
                            width={250} 
                            height={250} 
                            image={image} 
                            borderRadius={150}
                            scale={imgSet.scale}
                          />
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      )}
                    </Dropzone>
                    <Box w='100%'>
                      <label htmlFor='percent'>Size</label>
                      <Slider 
                        aria-label='slider-ex-1' 
                        defaultValue={30}
                        onChange={(e)=> 
                          setImg({scale:percentage( e, 50 )})
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </Box>
                  </Box>
                  {image&&
                    <Box w='100%'>
                      <Button onClick={handleUpload} style={{width:'100%'}} primary> Upload </Button>
                    </Box>
                  }
                </>
                : <Box my={[2,3,4]}> <Spinner   /> </Box>
              }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}