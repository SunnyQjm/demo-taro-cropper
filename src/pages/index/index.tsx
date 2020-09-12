import React, {Component} from 'react'
import Taro from '@tarojs/taro';
import {View, Button, Image} from '@tarojs/components'
import TaroCropper from 'taro-cropper';
import './index.scss'

interface IndexProps {

}

interface IndexState {
  src: string,
  cutImagePath: string,
}

export default class Index extends Component<IndexProps, IndexState> {

  constructor(props) {
    super(props);
    this.state = {
      src: '',
      cutImagePath: '',
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  taroCropper = React.createRef<TaroCropper>();

  render() {
    const {
      src,
      cutImagePath
    } = this.state;
    return (
      <View className='index'>
        <TaroCropper
          height={1000} src={src}
          cropperWidth={400}
          cropperHeight={400}
          ref={this.taroCropper}
          // themeColor={'#f00'}
          // hideFinishText
          fullScreen
          onCut={res => {
            this.setState({
              cutImagePath: res
            })
          }}
          hideCancelText={false}
          onCancel={() => {
            Taro.showToast({
              icon: 'none',
              title: '点击取消'
            })
          }}
        />
        <Button onClick={() => {
          Taro.chooseImage({
            count: 1
          })
            .then(res => {
              // console.log(res);
              this.setState({
                src: res.tempFilePaths[0]
              });
            })
        }}
        >
          选择图片
        </Button>
        <Button onClick={() => {
          this.taroCropper && this.taroCropper.current && this.taroCropper.current.cut()
            .then(res => {
              this.setState({
                cutImagePath: res.filePath
              });
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
        }}
        >
          裁剪
        </Button>
        <Image
          src={cutImagePath}
          mode='widthFix'
          style={{
            width: Taro.pxTransform(400, 750),
            height: Taro.pxTransform(400, 750)
          }}
        />
      </View>
    )
  }
}
