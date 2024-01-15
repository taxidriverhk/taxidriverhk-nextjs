import {
  GameVersion,
  MapItem,
  MapTutorial,
  ReleaseStatus,
} from "shared/types/cs-map-types";

export const mapItems: Array<MapItem> = [
  {
    id: 201,
    categoryId: 3,
    name: "de_taxi_plaza",
    fullName: "Battle at Plaza",
    version: "0.01",
    releaseDate: "2023-10-22",
    status: ReleaseStatus.InProgress,
    maxPlayers: 10,
    icon: "/csmaps/icon201.jpg",
    targetGameVersion: GameVersion.COUNTER_STRIKE_2,
    images: [
      {
        url: "https://live.staticflickr.com/65535/53281318131_69bae20cbe_b.jpg",
        caption: "Prototype",
      },
    ],
    downloadLinks: [],
    progressPercentage: 1,
  },
];

export const mapTutorials: Array<MapTutorial> = [
  {
    title: "Play your own addon/workshop map",
    hashKey: "play-your-own-addon-map",
    content: `
### Updated on 2023-12-26
Valve published an update to enable playing Workshop/addon maps without any hacks.

Once you build the map from Hammer, simply launch the default CS2, open the console and use the command below to play the map.

\`\`\`
map_workshop <workshop-id> <map-name>
\`\`\`

\`<workshop-id>\` and \`<map-name>\` are the same if you have not published the map to Steam Workshop yet, CS2 should be able to autocomplete both the ID and the name for you.

By default, the map will be launched in Competitive mode. If you want to launch the map in a different mode (e.g. Casual),
then use the following commands to set the relevant parameters before executing the \`map_workshop\` command.
\`\`\`
game_type <type-number>
game_mode <mode-number>
\`\`\`

Refer to [this table](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive/Game_Modes#Game_Type_and_Game_Mode) for a list of possible game types and mode numbers.

**============== Ignore the section below if you have already installed the latest version of CS2 ==============**

### Introduction
By default, the map your built from Hammer would only be available from the CS2 launched as part of the Workshop Tools.
It will not be available in the normal/release version of CS2.

There are some steps that we need to take in order to play the map from CS2 in the same way as other official maps.
Hopefully we don't have to take these steps as CS2 is getting more mature in terms of features.

### Preparation
The map generated by Hammer has an extension of \`.vpk\`, which is just an archive of build artifacts.
In order to decompress and compress \`.vpk\` files, you would need to download 7zip with a VPK format provider.

* **7-Zip**: [Download Link](https://www.7-zip.org/download.html)
* **VPK Format Provider**: [Download Link](https://github.com/SCell555/7zip-vpk/releases)

### Build and extract the map
Build the map as usual, once the build succeeds, a \`<your-addon-map-name>.vpk\` file should be generated under the directory
\`<your-drive>:\\\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo_addons\\<your-addon-map-name>\\maps\`.

Copy \`<your-addon-map-name>.vpk\` to a temporary directory of your choice, then extract the files as shown below.

![Screenshot 1](/csmaps/tutorials/tutorial202-1.jpg)

You will notice that the archive has everything except for \`materials\`.
If you load the map right now, the textures will not render correctly as they are not even found.

![Screenshot 2](/csmaps/tutorials/tutorial202-2.jpg)

### Put in the materials and compress
Under the temporary directory where you extracted \`<your-addon-map-name>.vpk\`, create a new directory called \`materials\`.

![Screenshot 3](/csmaps/tutorials/tutorial202-3.jpg)

Find the compiled materials (not the ones you saved as \`.vmat\` as they are intended for development use only) from the directory
\`<your-drive>:\\\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo_addons\\<your-addon-map-name>\\materials\`

From there, you will see a bunch of \`.vtex_c\` files, copy all of them (except for the folder named \`default\`) to the \`materials\` directory
you created under the temporary directory earlier.

![Screenshot 4](/csmaps/tutorials/tutorial202-4.jpg)

Go back to the temporary directory, select the two directories \`materials\` and \`maps\`,
right click for the context menu, and select \`7-Zip\`, followed by \`Add to archive\`.

![Screenshot 5](/csmaps/tutorials/tutorial202-5.jpg)

A dialog should show up, make sure the following are selected:
* **Archive**: \`<your-addon-map-name>.vpk\`
* **Archive format**: \`VPK\`
* **Compression level**: \`Store\`

![Screenshot 6](/csmaps/tutorials/tutorial202-6.jpg)

A new \`<your-addon-map-name>.vpk\` should be generated, put it to the directory
\`<your-drive>:\\\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\maps\`.

### Play the map

As of now, CS2 does not allow loading non-official maps by default.
We have to bypass the blocker by creating a shortcut to launch CS2 with special options.

Make a shortcut of the application \`Steam\` on your desktop, then go to \`Properties\` by right click.

![Screenshot 7](/csmaps/tutorials/tutorial202-7.jpg)

Add the string \` -applaunch 730 -insecure\` at the end of \`Target\`.
You could also change the icon by browsing the file
\`<your-drive>:\\\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe\`.

![Screenshot 7](/csmaps/tutorials/tutorial202-8.jpg)

Launch CS2 using the shortcut, open the console with key \`~\`, then type the following commands.
If everything is setup correctly, the console should auto-complete the map name for you.
\`\`\`
sv_cheats true
map <your-addon-map-name>
\`\`\`

![Screenshot 10](/csmaps/tutorials/tutorial202-10.jpg)

The map should now be loaded with textures, it's time to enjoy!

![Screenshot 9](/csmaps/tutorials/tutorial202-9.jpg)

`,
    creationDate: "2023-10-30",
    lastUpdateDate: "2023-12-26",
    thumbnail: "/csmaps/tutorial202.jpg",
    targetGameVersion: GameVersion.COUNTER_STRIKE_2,
    isDraft: false,
  },
  {
    title: "Types of textures for custom materials",
    hashKey: "textures-for-custom-materials",
    content: `
# Introduction
This is **not** a tutorial for creating or applying materials for mapping, but rather a reference for commonly used types of images for a material.
Please refer to other pages for relevant tutorials.

In order to put a texture onto any surface on a map, a material is required. To create a material, simply open [Material Editor](https://developer.valvesoftware.com/wiki/Source_2_Material_Editor) from the Workshop Tools, which looks something like below.

![Screenshot 1](/csmaps/tutorials/tutorial203-1.jpg)

# Requirements
In general, the image(s) used for a material should meet the requirements below at minimum.
* Format is \`.png\`
* Width and height must be powers of \`2\` (e.g. \`32\`, \`64\`, \`128\`, \`256\`, etc.).

# Shader
CS 2.0 uses the shader \`Csgo Simple\` by default for a material. A shader in this context is used to define different aspects of a material (e.g. how glossy it is, which part is trasparent, etc.).
A material should have one image at minimum, which is used for coloring. If you simply want to put an image without any other settings to a surface of a map, then the \`Csgo Simple\` shader should be sufficient.
Finally, the material will be saved as a \`.vmat\` file which can be browsed and used in **Hammer Editor** for mapping.

## Image Name Suffixes
The list of image name suffixes below (*non-exhaustive, more will be added as more updates come in*) explains the use of different images for a material and how they work in a very high level.
Please note that some of the images can only be used for the shader \`Csgo Complex\`. To make a glass material, please use the shader \`Csgo Glass\`, which will be covered in a separate tutorial.

## Example Usage
For example, if you want to create a material \`my_material.vmat\` that has coloring and is transparent, then two images should be created.
* \`my_material_color.png\` for coloring, assuming its size is \`1024\` x \`768\` pixels.
* \`my_material_trans.png\` for transparency mask, the size must be \`1024\` x \`768\` pixels, which means the sizes of all images must be the same.

## Shader Parameters
* \`_color\`
  * Used to tell the engine how to "paint" the surface.
  * Most of the materials should have this image at minimum.
  * ![Color Image](/csmaps/tutorials/tutorial203-2.jpg)
* \`_normal\`
  * Normal map, or known as a bump map, which is used to define how the surface looks like (e.g. orange peel texture).
  * It is rarely drawn or created by hand, there are multiple tools available to generate a normal map easily.
     * One of them is an online tool that can create a normal map for free with a great 3D preview capability [https://cpetry.github.io/NormalMap-Online/](https://cpetry.github.io/NormalMap-Online/).
* \`_trans\`
  * Close to an alpha mask, which is a grayscale image used to define the opacity of an image.
  * The part closer to white (i.e. grayscale value of \`255\`) is more light blocking, while that closer to black (i.e. value of \`0\`) is more transparent.
  * One example image is shown below, where the beverage container parts are visible and the rest will become invisible on the engine.
    * ![Trans Image](/csmaps/tutorials/tutorial203-3.jpg)
* \`_selfillum\`
  * A grayscale image that allows creation of illumination without using a light entity.
  * White = 100% light, Black = 0% light.
  * The image below shows how the illumination looks like even without any light entities on the map. Notice how the yellow part illuminates.
    * ![Self-Illumination](/csmaps/tutorials/tutorial203-4.jpg)
* \`_rough\`
  * An RGB image that defines how glossy or reflective the material is.
  * White = no reflection/flat, Black = highly reflective/glossy
  * A cube map should be used for the reflection to work.
  * The image below shows how the reflection works, note that the area is surrounded by the entity [\`env_combined_light_probe_volume\`](https://developer.valvesoftware.com/wiki/Env_combined_light_probe_volume).
    * ![Roughness](/csmaps/tutorials/tutorial203-5.jpg)

# References
* A more exhaustive list can be found at [https://developer.valvesoftware.com/wiki/Category:Shader_parameters](https://developer.valvesoftware.com/wiki/Category:Shader_parameters).
    `,
    creationDate: "2024-01-15",
    lastUpdateDate: "2024-01-15",
    thumbnail: "/csmaps/tutorial203.jpg",
    targetGameVersion: GameVersion.COUNTER_STRIKE_2,
    isDraft: false,
  },
  {
    title: "Import a static model from Blender",
    hashKey: "import-static-model-from-blender",
    content: `
# Introduction
For simplicity, this tutorial only covers the essential part to import a static model (i.e. no animation, joints, etc.) with a single material from **Blender**.
Please check out other tutorials if you would like to adjust other settings or to import more complex model(s).

# Settings in Blender
The following settings are used to create the model.
* **Blender 4.0** (any version at 2.80 or above should also work).
* Only one material is used.
  * The material should have already been defined in **Material Editor** with a relevant \`_color\` image at minimum.
  * The material name in Blender does not matter, what it matters it the image name that the material refers to (i.e. should be something like \`my_material_color.png\`).
  * If the material has other images like roughness mask, then you may not need to define it in **Blender** if you do not need it for previewing the model in **Blender**.

![Material](/csmaps/tutorials/tutorial204-2.jpg)

* The scene should use the \`Imperial\` system for measurement.
  * 1 unit in **Source 2 Hammer Editor** is roughly 0.25 inch in Blender.
  * Or you could keep 1 inch in Blender as 1 unit in Hammer for simplicity, this tutorial will explain how to scale the imported model in the **Workshop Tools** later.

![Material](/csmaps/tutorials/tutorial204-1.jpg)

* Everything else should remain unchanged.


# Exporting the Model
Once the model is created, select the model and then export the model as an \`.fbx\` file, remember to check \`Selected Objecs\` when exporting.
The file can be put at anywhere you want.

![Blender Export](/csmaps/tutorials/tutorial204-3.jpg)

# Importing the Model
From the **Workshop Tools**, open **ModelDoc Editor**, something like below should be shown. Start by double-clicking on \`Model\` at the \`Create New\` section.

![ModelDoc Editor](/csmaps/tutorials/tutorial204-4.jpg)

Save the file as a \`.vmdl\` file before proceeding. The file should be put under the directory \`<your-drive>:\\\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo_addons\\<your-addon-map-name>\\models\`

On the left hand side of the **ModelDoc Editor** screen, it has a node editor, which defines nodes/properties of the model. In this tutorial, we simple need two nodes.
* \`Add Meshes\`, the \`.fbx\` file you exported from Blender.
* \`DefaultMaterialGroup\`, the \`.vmat\` material file you use for the model.
  * If you followed the previous step, then **ModelDoc Editor** may be able to automatially select the material for you.
* [Optional] \`PhysicsShapeList\`, the \`.fbx\` file used as the collision mesh.
  * Without this, the player will be able to pass through the model, which is usually not a desired behavior.
  * While you may use the same \`.fbx\` file as the model file as the collision mesh, one with lower details should be used to optimize collision computation at gameplay.

![Node Editor](/csmaps/tutorials/tutorial204-5.jpg)

Finally, click on the button \`Needs Compling\` on the right hand side to build the model, which would automatically save the \`.vmdl\` file as an asset used for mapping.

![Needs Compling](/csmaps/tutorials/tutorial204-6.jpg)

# Using the Model

In the **Hammer Editor**, first add a \`prop_static\` entity. Then from the \`Object Properties\` on the right hand side, you should be able to pick the \`.vmdl\` file saved.

![Static Prop](/csmaps/tutorials/tutorial204-7.jpg)
![Object Properties](/csmaps/tutorials/tutorial204-8.jpg)

Ensure that you are in **Objects** mode by pressing \`5\` on the keyboard, you should be able to select the model and transform in the way you want.

![Transforming the Model](/csmaps/tutorials/tutorial204-10.jpg)

If you find that the scale of the model is not right, instead of scaling the entity itself,
you should do so by going to the **ModelDoc Editor** and adjust the \`Import Scale\` of the mesh.
Once the \`.vmdl\` file is re-compiled, then you should see the change on the **Hammer Editor** right away.

![Scaling the Model](/csmaps/tutorials/tutorial204-9.jpg)
    `,
    creationDate: "2024-01-15",
    lastUpdateDate: "2024-01-15",
    thumbnail: "/csmaps/tutorial204.jpg",
    targetGameVersion: GameVersion.COUNTER_STRIKE_2,
    isDraft: false,
  },
  {
    title: "Generate a minimap",
    hashKey: "generate-minimap",
    content: `
**Test Content**

This is the first paragraph

This is the second paragraph

![Image 1](/csmaps/tutorial201.jpg)

## Header 2
    `,
    creationDate: "2023-10-22",
    lastUpdateDate: "2023-10-22",
    thumbnail: "/csmaps/tutorial201.jpg",
    targetGameVersion: GameVersion.COUNTER_STRIKE_2,
    isDraft: true,
  },
];
