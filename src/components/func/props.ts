const props = {
  x:{
      type:Number,
      default:() => {
          return 0
      }
  },
  y:{
      type:Number,
      default:() => {
          return 0
      }
  },
  zIndex:{
      type:Number,
      default:() => {
          return 0
      }
  },
  w:{
      type:Number,
      default:() => {
          return 100
      }
  },
  h:{
      type:Number,
      default:() => {
          return 100
      }
  },
  isActive:{
      type:Boolean,
      default:() => {
          return false
      }
  },
  isDraggable:{
      type:Boolean,
      default:() => {
          return true
      }
  },
  isResizable:{
      type:Boolean,
      default:() => {
          return true
      }
  },
  isGuide:{
      type:Boolean,
      default:() => {
          return false
      }
  },
  guideStyle:{
      type:Object,
      default:() => {
          return {}
      }
  },
  resizeIconSize:{
      type:Number,
      default:() => {
          return 8
      }
  },
  isRotate:{
      type:Boolean,
      default:() => {
          return false
      }
  },
  rotate:{
      type:Number,
      default:() => {
          return 0
      }
  }
}

export default props