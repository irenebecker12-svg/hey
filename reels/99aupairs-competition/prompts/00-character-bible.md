# Character Bible — lock this before you generate a single clip

The single biggest failure mode for this reel is **the two women changing between shots**.
Generative video will not keep them consistent from a text prompt alone. Do this first.

## Workflow that actually holds faces together

1. **Generate ONE hero still** of the two women together (Higgsfield Soul, or any
   photoreal image model). Iterate on this one image until both faces are right.
2. **Generate 3–4 more stills** of the same two women in the other wardrobes/locations,
   using the hero still as a character reference / start frame.
3. **Only then** run image-to-video: each shot uses the matching still as its **start frame**,
   with the motion prompt from `01-shot-prompts.md`.
4. Text-to-video with no start frame is the fallback for shot 4A (penguins only, no faces)
   and nothing else.

If a clip comes back with a drifting face, regenerate from the still — do not try to fix it
with a wordier prompt.

## MAYA — Woman A

> 24, Spanish. Warm olive skin, natural texture with visible pores and a few sun freckles
> across the nose. Dark brown wavy hair to the shoulders, salt-damp and imperfect. Brown
> eyes, thick natural brows, a small gap between her front teeth when she laughs.
> 168cm, athletic-slim. Small gold hoop earrings, thin white shell necklace.
> Expressive, laughs with her whole face, always the one grabbing the other's hand.

## FREYA — Woman B

> 22, German. Fair skin, sun-pink across the shoulders and nose, light freckles.
> Dirty-blonde long straight hair, often falling out of a messy bun. Blue-grey eyes,
> pale lashes. 175cm, slim, noticeably taller than Maya — use the height difference as
> the fastest visual check that you have the right two people.
> Small silver nose stud, faded red string bracelet on left wrist.
> Quieter, wide-eyed reactions, the one who covers her mouth when something amazes her.

## Wardrobe continuity

| Shots | Maya | Freya |
|---|---|---|
| 1 (beach sprint) | Rust-orange bikini | Sage-green bikini |
| 2A/2B (snorkel) | Same rust bikini, black mask | Same sage bikini, clear mask |
| 3 (harbour) | White cotton sundress, gold hoops | Pale-blue linen slip dress |
| 4B (penguins) | Oversized cream fisherman jumper | Oversized navy puffer jacket |
| 5D / 6 / 7 (lookout, cliff) | Faded denim shorts + white tank | Khaki shorts + cropped tee |

Height difference, Maya's gold hoops, Freya's red string bracelet — three continuity anchors
you can check in one second per clip.

## Universal negative prompt — paste into every generation

```
text, watermark, logo, subtitles, captions, distorted hands, extra fingers, missing fingers,
deformed face, warped face, changing face, plastic skin, waxy skin, airbrushed skin,
oversaturated, HDR, stock photo look, corporate, staged posing, direct-to-camera modelling,
studio lighting, motion blur, mutated limbs, extra limbs, uncanny valley, doll eyes,
duplicate people, morphing, flickering, low resolution
```

## Universal style suffix — append to every prompt

```
shot on Sony FX3, 24mm anamorphic, shallow depth of field, natural sunlight, documentary
realism, candid, natural imperfect skin texture, film grain, true-to-life colour, 9:16 vertical
```
