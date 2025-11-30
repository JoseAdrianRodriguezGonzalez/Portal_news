<script>
	import Person from '$lib/components/person.svelte';
    import isa from '$lib/assets/isa.jpeg';
    
</script>

<h1 class="font-['Merriweather'] text-5xl md:text-5xl font-bold text-gray-800 text-center mb-4 pt-8 md:pt-12">
    Contact us
</h1>
<section class="grid grid-cols-1 sm:grid-cols-2  gap-6  p-6 
  max-w-7xl 
  mx-auto">
<Person name="María Isabel Rocha Vargas" email="isabelrocha31415@gmail.com" rol="Frontend developer" imagen={isa}/>
<Person name="María Isabel Rocha Vargas" email="isabelrocha31415@gmail.com" rol="Frontend developer" imagen={isa}/>
<Person name="María Isabel Rocha Vargas" email="isabelrocha31415@gmail.com" rol="Frontend developer" imagen={isa}/>
<Person name="María Isabel Rocha Vargas" email="isabelrocha31415@gmail.com" rol="Frontend developer" imagen={isa}/>
<Person name="María Isabel Rocha Vargas" email="isabelrocha31415@gmail.com" rol="Frontend developer" imagen={isa}/>
</section>
