# The Cottage★ — Original audio cue sheet

**Status:** Original instrumental bed generated and integrated into all four Remotion compositions. The workflow also packages a standalone WAV master and MP3 listening copy. Final listening review is still pending.  
**Source:** `scripts/generate-audio.mjs`  
**Output:** `public/audio/cottage-original-bed.wav` (generated during the render workflow; not committed as a large binary asset).

## Sound direction

The film should feel like remembering a good evening with friends: warm, slightly imperfect, gentle, and never louder than the photographs or words. It should not sound like a trailer or a corporate promo.

The soundtrack is generated from original synthesized tones. It uses no commercial recording, sampled dialogue, or identifiable voice recordings.

## Arrangement

- A slow, sustained chord bed creates the warm foundation.
- A simple plucked-note motif provides a little movement without becoming busy.
- A very low tonal layer helps the mix feel present on smaller speakers.
- Small, original soft clicks and high notes mark the scene changes.
- The first and last moments fade gently.
- The Remotion composition includes the same soundtrack in landscape, portrait, 120 fps, and 60 fps exports.

## Cue map

| Approx. time | Scene | Cue |
| --- | --- | --- |
| 00:00 | Opening | Chord bed fades in; the motif waits before entering. |
| 00:04.7 | Familiar | The plucked motif becomes audible. |
| 00:10.4 | Laugh | Keep the melody moving, with a quiet transition tick. |
| 00:16.1 | Together | The pad carries the scene; keep the rhythm unhurried. |
| 00:22.8 | Backyard | Let the same motif continue; avoid turning the SMP into an action trailer. |
| 00:30.5 | Memory | Bring the motif forward gently, with room around the notes. |
| 00:37.2 | Home | Resolve toward the final chord and leave a soft tail. |

## Technical notes

- 44.1 kHz, 16-bit, stereo PCM WAV.
- 45 seconds, matching the master composition.
- Conservative output peak with a soft fade at both ends.
- Integrated at a reduced volume in the video composition.
- The audio is recreated from source code on each CI run, so no generated WAV binary needs to be checked into Git.
- CI packages the WAV master and a 192 kbps MP3 copy separately from the video renders.
- CI checks the audio stream in every MP4, audio format, 45-second duration, and peak level; the result is saved in `out/technical-QA.txt` and included in the downloadable artifact.

## Review checklist

- [ ] Listen to the rendered master from start to finish.
- [ ] Check the mix on headphones and phone speakers.
- [ ] Check mono compatibility.
- [ ] Confirm the music does not mask any intended future voiceover.
- [ ] Adjust the music level or motif only after listening to the actual render.
