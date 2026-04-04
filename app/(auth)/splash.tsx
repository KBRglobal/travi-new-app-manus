// Screen 1 — Splash Screen — DESIGNED (Tropical Sunset V3)
// Route: /splash | Mode: Pre-auth
// Converted from user's splash-v3-tropical.html

import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

const { width: W, height: H } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const sunOpacity = useRef(new Animated.Value(0)).current;
  const sunScale = useRef(new Animated.Value(1)).current;
  const palmLeftY = useRef(new Animated.Value(30)).current;
  const palmLeftOpacity = useRef(new Animated.Value(0)).current;
  const palmRightY = useRef(new Animated.Value(30)).current;
  const palmRightOpacity = useRef(new Animated.Value(0)).current;
  const mascotY = useRef(new Animated.Value(-200)).current;
  const mascotOpacity = useRef(new Animated.Value(0)).current;
  const mascotScale = useRef(new Animated.Value(0.5)).current;
  const mascotRotate = useRef(new Animated.Value(-15)).current;
  const mascotBob = useRef(new Animated.Value(0)).current;
  const logoY = useRef(new Animated.Value(20)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const loadOpacity = useRef(new Animated.Value(0)).current;
  const waveX1 = useRef(new Animated.Value(0)).current;
  const waveX2 = useRef(new Animated.Value(0)).current;
  const waveX3 = useRef(new Animated.Value(0)).current;
  const waveOpacity1 = useRef(new Animated.Value(0)).current;
  const waveOpacity2 = useRef(new Animated.Value(0)).current;
  const waveOpacity3 = useRef(new Animated.Value(0)).current;
  const bar1 = useRef(new Animated.Value(0.3)).current;
  const bar2 = useRef(new Animated.Value(0.3)).current;
  const bar3 = useRef(new Animated.Value(0.3)).current;
  const bar4 = useRef(new Animated.Value(0.3)).current;
  const bar5 = useRef(new Animated.Value(0.3)).current;
  const sunLineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Sunset background fades in (0-2s)
    Animated.timing(bgOpacity, {
      toValue: 1, duration: 2000, useNativeDriver: true,
    }).start();

    // 2. Sun rises (0.3s delay)
    Animated.timing(sunOpacity, {
      toValue: 1, duration: 1500, delay: 300,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
    }).start();

    // Sun pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(sunScale, { toValue: 1.1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(sunScale, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    // Sun lines fade in at 1s
    Animated.timing(sunLineOpacity, {
      toValue: 1, duration: 1000, delay: 1000, useNativeDriver: true,
    }).start();

    // 3. Waves fade in staggered
    Animated.timing(waveOpacity1, { toValue: 1, duration: 1000, delay: 500, useNativeDriver: true }).start();
    Animated.timing(waveOpacity2, { toValue: 1, duration: 1000, delay: 800, useNativeDriver: true }).start();
    Animated.timing(waveOpacity3, { toValue: 1, duration: 1000, delay: 1100, useNativeDriver: true }).start();

    // Wave movement loops
    const waveLoop = (anim: Animated.Value, dur: number, reverse?: boolean) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: reverse ? -W * 0.25 : W * 0.25, duration: dur / 2, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: dur / 2, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    };
    waveLoop(waveX1, 8000);
    waveLoop(waveX2, 10000, true);
    waveLoop(waveX3, 12000);

    // 4. Palms slide up (0.8s, 1s delay)
    Animated.parallel([
      Animated.timing(palmLeftOpacity, { toValue: 1, duration: 1000, delay: 800, useNativeDriver: true }),
      Animated.timing(palmLeftY, { toValue: 0, duration: 1000, delay: 800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
    Animated.parallel([
      Animated.timing(palmRightOpacity, { toValue: 1, duration: 1000, delay: 1000, useNativeDriver: true }),
      Animated.timing(palmRightY, { toValue: 0, duration: 1000, delay: 1000, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    // 5. Mascot splash in (1.2s delay) — spring bounce
    Animated.sequence([
      Animated.delay(1200),
      Animated.parallel([
        Animated.spring(mascotY, { toValue: 0, tension: 40, friction: 7, useNativeDriver: true }),
        Animated.timing(mascotOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(mascotScale, { toValue: 1, tension: 40, friction: 7, useNativeDriver: true }),
        Animated.spring(mascotRotate, { toValue: 0, tension: 40, friction: 7, useNativeDriver: true }),
      ]),
    ]).start();

    // Mascot bob loop (starts after splash)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(mascotBob, { toValue: -5, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(mascotBob, { toValue: 3, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(mascotBob, { toValue: 0, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    }, 2200);

    // 6. Logo slides up (1.8s delay)
    Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 700, delay: 1800, useNativeDriver: true }),
      Animated.timing(logoY, { toValue: 0, duration: 700, delay: 1800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    // 7. Tagline fades in (2.2s delay)
    Animated.timing(taglineOpacity, {
      toValue: 1, duration: 600, delay: 2200, useNativeDriver: true,
    }).start();

    // 8. Loading bars (2.5s delay)
    Animated.timing(loadOpacity, {
      toValue: 1, duration: 500, delay: 2500, useNativeDriver: true,
    }).start();

    // Loading bar wave loop
    const barPulse = (bar: Animated.Value, delay: number) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(bar, { toValue: 1, duration: 750, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            Animated.timing(bar, { toValue: 0.3, duration: 750, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          ])
        ).start();
      }, 2500 + delay);
    };
    barPulse(bar1, 0);
    barPulse(bar2, 150);
    barPulse(bar3, 300);
    barPulse(bar4, 450);
    barPulse(bar5, 600);

    // Navigate after 4.5s
    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const mascotRotateStr = mascotRotate.interpolate({
    inputRange: [-15, 0],
    outputRange: ["-15deg", "0deg"],
  });

  return (
    <View style={s.root}>
      {/* Sunset gradient background */}
      <Animated.View style={[s.sunsetBg, { opacity: bgOpacity }]}>
        <LinearGradient
          colors={["#0A0514", "#1A0D3D", "#3D1480", "#6443F4", "#F94498", "#FF9327", "#FDCD0A", "#FF9327", "#1A0D3D"]}
          locations={[0, 0.2, 0.35, 0.48, 0.58, 0.68, 0.78, 0.88, 1]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Sun */}
      <Animated.View style={[s.sun, { opacity: sunOpacity, transform: [{ scale: sunScale }] }]}>
        <View style={s.sunGlow} />
      </Animated.View>

      {/* Sun reflection lines */}
      <Animated.View style={[s.sunLines, { opacity: sunLineOpacity }]}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[s.sunLine, {
            top: 5 + i * 10,
            width: `${100 - i * 20}%`,
            marginLeft: `${i * 10}%`,
          }]} />
        ))}
      </Animated.View>

      {/* Palm silhouettes */}
      <Animated.View style={[s.palmLeft, { opacity: palmLeftOpacity, transform: [{ translateY: palmLeftY }, { scaleX: -1 }] }]}>
        <Svg width={80} height={140} viewBox="0 0 80 140">
          <Path d="M40 140 L42 60 Q20 40 5 10 Q25 35 42 55 Q35 25 15 0 Q38 30 44 55 Q50 25 65 0 Q48 30 44 55 Q60 35 75 10 Q55 40 42 60" fill="rgba(0,0,0,0.7)" />
        </Svg>
      </Animated.View>
      <Animated.View style={[s.palmRight, { opacity: palmRightOpacity, transform: [{ translateY: palmRightY }] }]}>
        <Svg width={80} height={140} viewBox="0 0 80 140">
          <Path d="M40 140 L42 60 Q20 40 5 10 Q25 35 42 55 Q35 25 15 0 Q38 30 44 55 Q50 25 65 0 Q48 30 44 55 Q60 35 75 10 Q55 40 42 60" fill="rgba(0,0,0,0.7)" />
        </Svg>
      </Animated.View>

      {/* Ocean waves */}
      <View style={s.ocean}>
        <Animated.View style={[s.wave, { opacity: waveOpacity1, transform: [{ translateX: waveX1 }] }]}>
          <Svg width={W * 2} height={H * 0.45} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <Path d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L0,320Z" fill="rgba(26,13,61,0.85)" />
          </Svg>
        </Animated.View>
        <Animated.View style={[s.wave, { opacity: waveOpacity2, transform: [{ translateX: waveX2 }] }]}>
          <Svg width={W * 2} height={H * 0.45} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <Path d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,213.3C672,213,768,171,864,154.7C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L0,320Z" fill="rgba(26,13,61,0.9)" />
          </Svg>
        </Animated.View>
        <Animated.View style={[s.wave, { opacity: waveOpacity3, transform: [{ translateX: waveX3 }] }]}>
          <Svg width={W * 2} height={H * 0.45} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <Path d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,245.3C672,256,768,256,864,234.7C960,213,1056,171,1152,170.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L0,320Z" fill="#1A0D3D" />
          </Svg>
        </Animated.View>
      </View>

      {/* Mascot on water */}
      <Animated.View style={[s.mascotWrap, {
        opacity: mascotOpacity,
        transform: [
          { translateY: Animated.add(mascotY, mascotBob) },
          { scale: mascotScale },
          { rotate: mascotRotateStr },
        ],
      }]}>
        <Image
          source={require("@/assets/images/mascot-dark.png")}
          style={s.mascotImg}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Logo + Tagline at bottom */}
      <View style={s.content}>
        <Animated.View style={[s.logoWrap, { opacity: logoOpacity, transform: [{ translateY: logoY }] }]}>
          <Svg width={180} height={82} viewBox="0 0 638 290" fill="none">
            <Path d="M22.958 0C51.5653 27.5609 92.1862 46.6188 137.166 53.667C140.603 54.2152 144.067 54.7005 147.558 55.1221C150.422 55.468 153.306 55.7707 156.209 56.0312C189.464 59.0163 235.108 58.7261 275.471 50.6182V83.8037C260.879 86.363 244.61 87.3215 229.936 88.1855C224.106 88.5289 218.527 88.8574 213.405 89.2656L213.392 89.0947C193.531 90.6776 174.455 90.7103 156.049 89.2061C157.036 95.8152 158.083 102.726 159.112 109.949C161.876 129.335 164.412 150.326 164.667 170.854C165.169 211.237 156.853 254.902 118.004 279.916C97.2029 293.309 71.1354 291.028 52.3057 278.995C32.7185 266.478 19.9717 242.877 26.5068 213.982C32.0536 189.458 45.4059 172.109 63.9053 157.545C80.875 144.185 103.038 132.552 127.877 119.547C127.645 117.864 127.411 116.183 127.172 114.503C125.752 104.546 124.179 94.4427 122.775 84.7158C74.2251 75.5248 31.9519 54.4748 0 23.9531L22.958 0ZM350.969 105.407C366.526 105.407 380.545 108.998 393.024 116.007C405.504 123.016 415.249 132.761 422.6 144.898C429.951 157.036 433.541 170.884 433.541 186.27V264.056H403.794V236.952C398.192 245.912 390.842 253.124 381.741 258.585C371.484 264.739 359.687 267.987 346.182 267.987V268.158C331.308 268.158 317.974 264.397 306.178 257.046C294.553 249.695 285.322 239.779 278.483 227.471C271.645 215.162 268.396 201.485 268.396 186.44C268.397 171.396 271.987 158.233 279.338 145.753C286.689 133.444 296.433 123.7 308.913 116.349C321.393 108.997 335.412 105.407 350.969 105.407ZM504.666 235.709C504.666 236.513 505.202 237.318 505.738 237.854C506.543 238.659 507.348 238.659 508.152 238.659C509.225 238.659 510.298 238.391 510.834 237.854C511.37 237.318 512.175 235.709 512.175 235.709L556.959 111.278H589.676L540.064 244.291C537.383 252.068 533.092 258.236 527.729 262.259C522.097 266.013 515.393 268.158 508.152 268.158C500.912 268.158 494.475 266.281 488.844 262.259C483.212 257.968 479.19 252.068 476.24 244.291L426.896 111.278H459.882L504.666 235.709ZM275.342 136.277H254.075C252.844 136.208 251.614 136.18 250.383 136.18C249.952 136.18 249.526 136.186 249.103 136.197C239.441 136.459 231.669 139.708 225.937 146.096C219.953 152.763 216.876 161.823 216.876 173.106V264.226L216.705 264.396H185.42V172.08C185.42 159.43 187.813 148.147 192.6 138.231C197.386 128.316 204.225 120.452 213.456 114.811C222.688 109.169 233.971 106.263 247.477 106.263C248.022 106.263 248.564 106.269 249.103 106.28V106.263H275.342V136.277ZM631.496 264.278H598.357V111.278H631.496V264.278ZM131.652 154.014C111.587 164.625 95.938 173.388 83.8633 182.895C69.6994 194.046 61.5191 205.438 57.9766 221.1C54.6648 235.742 60.6706 246.052 69.6787 251.809C79.4441 258.049 91.8152 258.405 100.537 252.789C124.807 237.162 132.871 208.657 132.405 171.255C132.335 165.586 132.067 159.827 131.652 154.014ZM350.969 134.982C341.224 134.982 332.506 137.376 324.812 142.163C317.119 146.95 310.964 153.105 306.52 160.969C302.075 168.833 299.682 177.381 299.682 186.954C299.682 196.528 301.904 204.734 306.52 212.769C310.964 220.633 317.119 226.957 324.812 231.573C332.506 236.189 341.224 238.583 350.969 238.583C360.713 238.583 369.432 236.189 377.296 231.573C385.16 226.957 391.144 220.633 395.589 212.769C400.034 204.905 402.256 196.357 402.256 186.954C402.256 177.552 400.034 168.833 395.589 160.969C391.144 153.105 384.989 146.95 377.296 142.163C369.432 137.376 360.713 134.982 350.969 134.982ZM614.93 48.4775C627.582 48.4775 637.838 58.7339 637.838 71.3857C637.838 84.0376 627.582 94.2939 614.93 94.2939C602.278 94.2939 592.021 84.0376 592.021 71.3857C592.022 58.7339 602.278 48.4776 614.93 48.4775Z" fill="white" />
          </Svg>
        </Animated.View>
        <Animated.Text style={[s.tagline, { opacity: taglineOpacity }]}>
          Your AI Travel Companion
        </Animated.Text>
      </View>

      {/* Loading bars */}
      <Animated.View style={[s.loadWrap, { opacity: loadOpacity }]}>
        {[bar1, bar2, bar3, bar4, bar5].map((bar, i) => (
          <Animated.View key={i} style={[s.loadBar, { opacity: bar }]} />
        ))}
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1a0533",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 140,
  },
  sunsetBg: {
    ...StyleSheet.absoluteFillObject,
  },

  // Sun
  sun: {
    position: "absolute",
    width: 120,
    height: 120,
    top: "42%",
    alignSelf: "center",
    borderRadius: 60,
    backgroundColor: "#FDCD0A",
    shadowColor: "#FDCD0A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 20,
  },
  sunGlow: {
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 80,
    backgroundColor: "rgba(253,205,10,0.2)",
  },

  // Sun lines
  sunLines: {
    position: "absolute",
    width: 120,
    height: 60,
    top: "48%",
    alignSelf: "center",
    overflow: "hidden",
  },
  sunLine: {
    position: "absolute",
    height: 3,
    backgroundColor: "rgba(253,205,10,0.3)",
    borderRadius: 1.5,
  },

  // Palms
  palmLeft: {
    position: "absolute",
    bottom: "38%",
    left: -10,
    zIndex: 3,
  },
  palmRight: {
    position: "absolute",
    bottom: "38%",
    right: -10,
    zIndex: 3,
  },

  // Ocean
  ocean: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    overflow: "hidden",
  },
  wave: {
    position: "absolute",
    width: W * 2,
    height: "100%",
    left: -W * 0.5,
  },

  // Mascot
  mascotWrap: {
    position: "absolute",
    bottom: "25%",
    zIndex: 5,
    alignSelf: "center",
  },
  mascotImg: {
    width: 160,
    height: 160,
  },

  // Content
  content: {
    position: "relative",
    zIndex: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  logoWrap: {
    marginBottom: 8,
  },
  tagline: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: "Satoshi-Medium",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },

  // Loading bars
  loadWrap: {
    position: "absolute",
    bottom: 60,
    zIndex: 10,
    flexDirection: "row",
    gap: 6,
  },
  loadBar: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});
