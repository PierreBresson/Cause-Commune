package com.cause.commune;

import android.app.Application;

import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.rpt.reactnativecheckpackageinstallation.CheckPackageInstallationPackage;
import cl.json.RNSharePackage;
import com.eko.RNBackgroundDownloaderPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rpt.reactnativecheckpackageinstallation.CheckPackageInstallationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new FastImageViewPackage(),
          new MainReactPackage(),
          new RNFSPackage(),
          new TrackPlayer(), 
          new RNBackgroundDownloaderPackage(), 
          new RNSharePackage(),
          new VectorIconsPackage(), 
          new CheckPackageInstallationPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
