export enum MuteButtonDataAttributes {
  /** Applied when explicitly muted via toggle. */
  muted = 'data-muted',
  /** Applied when volume is 0 (includes when muted). */
  volumeOff = 'data-volume-off',
  /** Applied when volume > 0 and not muted (audio is audible). */
  volumeOn = 'data-volume-on',
  /** Applied when volume > 0 and <= 0.5. */
  volumeLow = 'data-volume-low',
  /** Applied when volume >= 0.5. */
  volumeHalf = 'data-volume-half',
  /** Applied when volume > 0.66. */
  volumeHigh = 'data-volume-high',
}
