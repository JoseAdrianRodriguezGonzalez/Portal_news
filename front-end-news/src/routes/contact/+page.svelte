<script>
	import Person from '$lib/components/person.svelte';
  import isa from '$lib/assets/isa.jpeg';
  import adr from '$lib/assets/adrian.jpeg';
  import jor from '$lib/assets/jorge.jpeg';
  import emi from '$lib/assets/emilio.png';

    
</script>

<h1 class="font-['Merriweather'] text-5xl md:text-5xl font-bold text-gray-800 text-center mb-4 pt-8 md:pt-12">
    Contact us
</h1>
<section class="grid grid-cols-1 sm:grid-cols-2  gap-6  p-6 
  max-w-7xl 
  mx-auto">
<Person name="José Adrián Rodríguez González" github="https://github.com/JoseAdrianRodriguezGonzalez" rol="DevOps" imagen={adr}/>
<Person name="Barroso Solorzano Jorge Antonio " github="https://github.com/BarrosoJorge" rol="Backend developer" imagen={jor}/>
<Person name="María Isabel Rocha Vargas" github="https://github.com/Isa-Rocha31415" rol="Frontend developer" imagen={isa}/>
<Person name="Hector Emilio Valdes Velazquez " github="https://github.com/Emilio-Velazquez" rol="Backend developer" imagen={emi}/>
</section>
