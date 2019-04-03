import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TrackPlayer from "react-native-track-player";
import { pathOr } from "ramda";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateTrackInfo } from "../../actions";
import PlayerButton from "../../components/playerButton";
import ProgressBar from "../../components/progressBar";
import config from "../../config";

class PodcastScreen extends Component {
  constructor(props) {
    super(props);
  }

  _togglePlayPause = () => {
    if (this.props.player_state == TrackPlayer.STATE_PAUSED) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  };

  _listenLive = async () => {
    TrackPlayer.reset();
    let info = {
      title: "Cause Commune en direct sur 93.1",
      artist: "Cause Commune",
      isStreaming: true,
      artwork: null
    };
    await TrackPlayer.add({
      id: "live",
      url: "https://icecast.libre-a-toi.org:8444/voixdulat_mp3",
      title: "Cause Commune en direct sur 93.1",
      artist: "Cause Commune",
      album: "Podcast"
    });
    this.props.updateTrackInfo(info);
    await TrackPlayer.play();
  };

  renderLive = () => {
    return (
      <TouchableOpacity style={styles.headerView} onPress={this._listenLive}>
        <Text style={styles.headerText}>
          {config.strings.podcastScreen.header}
        </Text>
        <IconMaterialCommunityIcons
          name={"radio-tower"}
          size={35}
          color={config.colors.thinkerGreen}
        />
      </TouchableOpacity>
    );
  };

  renderInfoPodast = () => {
    return (
      <View style={styles.infoPodastView}>
        <Text style={styles.title}>{this.props.track.title}</Text>
      </View>
    );
  };

  _addOrRemoveSeconds = async seconds => {
    let position = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(position + seconds);
  };

  renderControls = () => {
    return (
      <View style={styles.controlView}>
        <PlayerButton
          iconName={"replay-10"}
          onPress={() => this._addOrRemoveSeconds(-10)}
        />
        <PlayerButton
          iconName={
            this.props.player_state == TrackPlayer.STATE_PAUSED
              ? "controller-play"
              : "controller-paus"
          }
          onPress={async () => this._togglePlayPause()}
        />
        <PlayerButton
          iconName={"forward-10"}
          onPress={() => this._addOrRemoveSeconds(10)}
        />
      </View>
    );
  };

  render() {
    const { artwork, isStreaming } = this.props.track;

    return (
      <View style={config.styles.container}>
        {this.renderLive()}
        <View style={{ flex: 1 }}>
          <Image
            style={styles.artwork}
            resizeMode={"contain"}
            source={artwork ? { uri: artwork } : config.images.logo}
          />
          <View style={styles.bottomView}>
            {this.renderInfoPodast()}
            {!isStreaming && <ProgressBar />}
            {this.renderControls()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    paddingRight: 10,
    fontFamily: config.fonts.titleFont,
    color: config.colors.black
  },
  artwork: {
    flex: 1,
    width: null,
    height: null
  },
  bottomView: {
    flex: 1,
    paddingBottom: 10
  },
  infoPodastView: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: config.fonts.titleFont,
    textAlign: "center",
    color: config.colors.black
  },
  controlView: {
    flex: 1,
    flexDirection: "row"
  }
});

function mapStateToProps(state) {
  return {
    player_state: state.player.player_state,
    track: state.player.track
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateTrackInfo: info => dispatch(updateTrackInfo(info))
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastScreen);
