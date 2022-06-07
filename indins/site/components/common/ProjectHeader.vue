<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <TextBlock :data="textBlock"/>
      <PortLogo :data="portLogo"/>
      <TextBlock :data="textBlockAdvanced"/>
    </AngularBlock>
    <PortTopPreview :data="portTopPreview"/>
  </div>
</template>

<script>
import PageTitle from './UI/PageTitle';
import TextBlock from './UI/TextBlock';
import PortLogo from './PortLogo';
import AngularBlock from './AngularBlock';
import PortTopPreview from './PortTopPreview';

export default {
  name: 'ProjectHeader',
  components: {
    PortTopPreview,
    AngularBlock,
    PortLogo,
    TextBlock,
    PageTitle,
  },
  props: {
    pageTitle: {
      type: Object,
      default: () => ({
        title: '',
      }),
    },
    textBlock: {
      type: Object,
      default: () => ({
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '',
      }),
    },
    portLogo: {
      type: Object,
      default: () => ({
        src: '',
        alt: this.pageTitle,
      }),
    },
    textBlockAdvanced: {
      type: Object,
      default: () => ({
        areaClass: 'port-text',
        text: '',
      }),
    },
    portTopPreview: {
      type: Object,
      default: () => ({
        alt: '',
        srcDesk: {
          img: '',
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: '',
          action: 'adaptiveResizeMax',
          width: 195,
        },
      }),
    },
  },
  data: () => ({
    angularBlock: {
      areaClass: 'main-title team-title',
      sawBottom: true,
    },
  }),
};
</script>
