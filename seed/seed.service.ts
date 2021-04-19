import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/modules/config/config.service';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import { PlantService } from 'src/modules/plant/plant.service';
import { UserRoleKey } from 'src/modules/user-role/enum/user-role-key.enum';
import { UserRole } from 'src/modules/user-role/user-role.entity';
import { User } from 'src/modules/user/user.entity';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class SeedService {
  constructor(
    private configService: ConfigService,
    private encryptionService: EncryptionService,
    private plantService: PlantService,
  ) {}

  @Transactional()
  async seed(): Promise<void> {
    const [userRoleAdmin, userRoleUser] = await Promise.all(
      [
        {
          id: 1,
          key: UserRoleKey.ADMIN,
        },
        {
          id: 2,
          key: UserRoleKey.USER,
        },
      ].map((ur) => {
        const userRole = new UserRole();
        userRole.id = ur.id;
        userRole.key = ur.key;
        return getRepository(UserRole).save(userRole);
      }),
    );
    const [adminUser] = await Promise.all(
      [
        {
          id: 1,
          email: 'info@plant-care.com',
          password: await this.encryptionService.hashPassword('PlantCare2021!'),
          user_role: userRoleAdmin,
          username: 'admin',
        },
        {
          id: 2,
          email: 'user@plant-care.com',
          password: await this.encryptionService.hashPassword('PlantCareUser!'),
          user_role: userRoleUser,
          username: 'user',
        },
      ].map((u) => {
        const user = new User();
        user.id = u.id;
        user.username = u.username;
        user.email = u.email;
        user.password = u.password;
        user.user_role = u.user_role;
        return getRepository(User).save(user);
      }),
    );
    const [rosePlant, orchidPlant] = await Promise.all([
      this.plantService.create({
        name: 'Rose',
        info:
          'A rose is a woody perennial flowering plant of the genus Rosa, in the family Rosaceae, or the flower it bears',
        image_path: 'rose.png',
        days_water: 4,
        care: "Roses's care instructions",
      }),
      this.plantService.create({
        name: 'Cactus',
        info:
          'A cactus is a member of the plant family Cactaceae,a family comprising about 127 genera with some 1750 known species of the order Caryophyllales.',
        image_path: 'cactus.png',
        days_water: 12,
        care: "Cactus's care instructions",
      }),
	  this.plantService.create({
        name: 'Monstera',
        info:
          'Monstera is a genus of 45 species of flowering plants in the arum family, Araceae, native to tropical regions of the Americas. The genus is named from the Latin word for "monstrous" or "abnormal", and refers to the unusual leaves with natural holes that members of the genus have',
        image_path: 'monstera.png',
        days_water: 7,
        care: "Monstera's care instructions",
      }),
	this.plantService.create({
			name: 'Narcissus ',
			info:
			  'Narcissus is a genus of predominantly spring flowering perennial plants of the amaryllis family, Amaryllidaceae. Various common names including daffodil,[Note 1] narcissus and jonquil are used to describe all or some members of the genus. Narcissus has conspicuous flowers with six petal-like tepals surmounted by a cup- or trumpet-shaped corona. The flowers are generally white and yellow (also orange or pink in garden varieties), with either uniform or contrasting coloured tepals and corona',
			image_path: 'narcissus.png',
			days_water: 7,
			care: "Narcissus's care instructions",
		  }),
	this.plantService.create({
			name: 'Poinsettia',
			info:
			  'The poinsettia (/pɔɪnˈsɛtiə/ or /pɔɪnˈsɛtə/) (Euphorbia pulcherrima) is a commercially important plant species of the diverse spurge family (Euphorbiaceae). Indigenous to Mexico and Central America, the poinsettia was first described by Europeans in 1834. It is particularly well known for its red and green foliage and is widely used in Christmas floral displays. It derives its common English name from Joel Roberts Poinsett, the first United States Minister to Mexico, who is credited with introducing the plant to the US in the 1820s. Poinsettias are shrubs or small trees, with heights of 0.6–4 m (2.0–13.1 ft). Though often stated to be highly toxic, the poinsettia is not dangerous to pets or children. Exposure to the plant, even consumption, most often results in no effect, though it can cause nausea, vomiting, or diarrhea',
			image_path: 'poinsettia.png',
			days_water: 2,
			care: "Poinsettia's care instructions",
		  }),
	this.plantService.create({
			name: 'Viola odorata',
			info:
			  'Viola odorata is a species of flowering plant in the viola family, native to Europe and Asia. This small hardy herbaceous perennial is commonly known as wood violet, sweet violet, English violet, common violet, florists violet, or garden violet. It has been introduced into North America and Australia.',
			image_path: 'viola_odorata.png',
			days_water: 6,
			care: "Viola odorata's care instructions",
		  }),
	this.plantService.create({
			name: 'Cyclamen',
			info:
			  'Cyclamen is a genus of 23 species of perennial flowering plants in the family Primulaceae. Cyclamen species are native to Europe and the Mediterranean Basin east to Iran, with one species in Somalia. They grow from tubers and are valued for their flowers with upswept petals and variably patterned leaves',
			image_path: 'cyclamen.png',
			days_water: 7,
			care: "Cyclamen's care instructions",
		  }),
	this.plantService.create({
			name: 'Bonsai',
			info:
			  'A rose is a woody perennial flowering plant of the genus Rosa, in the family Rosaceae, or the flower it bears',
			image_path: 'bonsai.png',
			days_water: 1,
			care: "Bonsai's care instructions",
		  }),
	this.plantService.create({
			name: 'Ficus',
			info:
			  'Ficus is a genus of about 850 species of woody trees, shrubs, vines, epiphytes and hemiepiphytes in the family Moraceae. Collectively known as fig trees or figs, they are native throughout the tropics with a few species extending into the semi-warm temperate zone. The common fig (F. carica) is a temperate species native to southwest Asia and the Mediterranean region (from Afghanistan to Portugal), which has been widely cultivated from ancient times for its fruit, also referred to as figs. The fruit of most other species are also edible though they are usually of only local economic importance or eaten as bushfood. However, they are extremely important food resources for wildlife. Figs are also of considerable cultural importance throughout the tropics, both as objects of worship and for their many practical uses',
			image_path: 'ficus.png',
			days_water: 7,
			care: "Ficus's care instructions",
		  }),
	this.plantService.create({
			name: 'Parlour palm',
			info:
			  'Chamaedorea elegans, the neanthe bella palm or parlour palm, is a species of small palm tree native to the rainforests in Southern Mexico and Guatemala. The parlor palm is one of the most heavily sold houseplant palms in the world. It is one of several species with leaves that are harvested as xate',
			image_path: 'parlour_palm.png',
			days_water: 3,
			care: "Parlour palm's care instructions",
		  }),

	this.plantService.create({
			name: 'Orchidaceae',
			info:
			  'The Orchidaceae are a diverse and widespread family of flowering plants, with blooms that are often colourful and fragrant, commonly known as the orchid family',
			image_path: 'orchidaceae.png',
			days_water: 8,
			care: "Orchidaceae's care instructions",
		  }),

    ]);
  }
}
