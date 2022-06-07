<template>
  <div class="audio-player">
    <audio
      class="audio-player-element"
      :src="fileSource"
      ref="audio"
      @timeupdate="timeUpdate($event)"
      @durationchange="changeDuration($event)"
      @ended="pause"
      @pause="pause"
      @play="play"
    />
    <div class="audio-player-controls">
      <v-btn
        :color="computedButtonsColor"
        small
        icon
        outlined
        @click="togglePause"
      >
        <v-icon size="20">
          {{ playToggleIcon }}
        </v-icon>
      </v-btn>
      <v-menu
        v-model="volumePopup"
        :close-on-content-click="false"
        content-class="audio-player-volume-menu"
        offset-y
        top
        nudge-top="6"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            :color="computedButtonsColor"
            class="ml-4"
            small
            icon
            outlined
            v-on="on"
          >
            <v-icon size="20">
              {{ volumeIcon }}
            </v-icon>
          </v-btn>
        </template>
        <div class="audio-player-volume-slider">
          <SimpleSlider
            v-model="volumeLevel"
            :min="0"
            :max="1"
            :step="0.01"
          />
        </div>
      </v-menu>
      <div class="audio-player-progress">
        <ProgressBar
          :current-value="currentTime"
          :row-description="false"
          :max="duration"
          min="0"
          line-color="#52B066"
          @click.native="progressClick($event)"
        />
      </div>
      <div class="audio-player-times">
        <span class="audio-player-current-time">
          {{ currentTimeText }}
        </span>
        /
        <span class="audio-player-duration">
          {{ durationText }}
        </span>
      </div>
      <v-btn
        v-if="closeBtn"
        :color="computedButtonsColor"
        class="ml-4"
        small
        icon
        outlined
        @click="close"
      >
        <v-icon size="20">
          close
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { getType, getObjectField } from '../../helpers';

export default {
  name: 'AudioPlayer',
  props: {
    file: {
      validator(value) {
        const validType = ['String', 'Object', 'File'];
        return validType.includes(getType(value)) || !value;
      },
      default: '',
    },
    urlField: {
      type: String,
      default: 'url',
    },
    color: {
      type: String,
      default: '',
    },
    closeBtn: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      playerElement: null,
      playing: false,
      currentTime: 0,
      duration: 0,
      volumePopup: false,
      volumeIcon: 'volume_up',
    };
  },

  computed: {
    fileSource() {
      const type = this.$getType(this.file);
      if (type === 'String') return this.file;
      if (type === 'File') return this.getAudioBlob(this.file);
      if (type === 'Object') return getObjectField(this.file, this.urlField);
      return '';
    },
    volumeLevel: {
      get() {
        return this.playerElement?.volume || 1;
      },
      set(value) {
        if (!this.playerElement) return;
        this.playerElement.volume = value;
        this.updateIcon();
      },
    },
    computedButtonsColor() {
      return this.color || this.$defaultConfig.color;
    },
    playToggleIcon() {
      return this.playing ? 'pause' : 'play_arrow';
    },
    currentTimeText() {
      if (!this.duration || !this.currentTime) return '0:00';
      const intCurrentTime = Math.floor(this.currentTime);
      let minutes = Math.floor(intCurrentTime / 60);
      minutes = minutes > 9 ? minutes : `0${minutes}`;
      let seconds = intCurrentTime % 60;
      seconds = seconds > 9 ? seconds : `0${seconds}`;
      return `${minutes}:${seconds}`;
    },
    durationText() {
      if (!this.duration) return '0:00';
      const intDuration = Math.floor(this.duration);
      let minutes = Math.floor(intDuration / 60);
      minutes = minutes > 9 ? minutes : `0${minutes}`;
      let seconds = intDuration % 60;
      seconds = seconds > 9 ? seconds : `0${seconds}`;
      return `${minutes}:${seconds}`;
    },
  },

  watch: {
    file: {
      deep: true,
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.playerElement.load();
          this.playerElement.pause();
          this.playing = false;
          this.playerElement.currentTime = 0;
          this.currentTime = 0;
        })
      }
    }
  },

  mounted() {
    this.playerElement = this.$el.querySelector('.audio-player-element');
  },

  methods: {
    getAudioBlob(file) {
      return URL.createObjectURL(file);
    },
    togglePause() {
      if (this.playing) {
        this.playerElement.pause();
        return;
      }
      this.playerElement.play();
    },
    timeUpdate(event) {
      this.currentTime = event.target.currentTime;
    },
    changeDuration(event) {
      this.duration = event.target.duration;
    },
    pause() {
      this.playing = false;
    },
    play() {
      this.playing = true;
    },
    progressClick(event) {
      const line = event.target.closest('.progress-bar_full-percent-line');
      if (!line) return;
      const x = event.clientX;
      const lineCoords = line.getBoundingClientRect();
      const progress = x - lineCoords.left;
      const percent = progress / lineCoords.width;
      this.playerElement.currentTime = this.duration * percent;
    },
    updateIcon() {
      this.volumeIcon = this.playerElement?.volume === 0
        ? 'mdi-volume-mute'
        : 'volume_up';
    },
    close() {
      this.playerElement.pause();
      this.playerElement.currentTime = 0;
      this.currentTime = 0;
      this.$emit('close');
    }
  },
};
</script>

<style lang="stylus">
.audio-player
  padding: 6px 8px
  .progress-bar_full-percent-line
    height: 5px
    border-radius: 2px
    cursor: pointer
    span
      border-radius: 2px

.audio-player-controls
  display: flex
  flex-flow: row nowrap
  justify-content: flex-start
  align-items: center

.audio-player-progress
  flex-grow: 2
  padding: 0 9px

.audio-player-volume-menu
  overflow: visible
  contain: initial

.audio-player-volume-slider
  position: relative
  display: flex
  flex-flow: row nowrap
  align-items: center
  width: 250px
  height: 36px
  padding: 0 9px
  border-radius: 4px
  background: #ffffff
  &::after
    content: ''
    position: absolute
    top: 30px
    left: 4px
    z-index: 1
    display: block
    width: 0
    height: 0
    border: 10px solid #ffffff
    border-left-color: transparent
    border-right-color: transparent
    border-bottom-color: transparent
  .simple-slider-wrapper
    position: relative
    z-index: 2
    width: 100%
    padding-top: 0

.audio-player-times
  font-size: 14px
  color: #dadada

.audio-player-current-time
  display: inline-block
  margin-right: 2px
  color: #202124

.audio-player-duration
  display: inline-block
  margin-left: 2px
  color: #97989e
</style>
